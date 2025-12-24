import '@lynx-js/react/experimental/lazy/import';
import { root } from '@lynx-js/react'

import { App } from './App.js'

import { __root } from '@lynx-js/react/internal'
// Add this before your `root.render()` statement in your entry tsx file

{
  const SnapshotOperation = {
      CreateElement: 0,
      InsertBefore: 1,
      RemoveChild: 2,
      SetAttribute: 3,
      SetAttributes: 4,
      DEV_ONLY_AddSnapshot: 100,
      DEV_ONLY_RegisterWorklet: 101,
  };
  const SnapshotOperationParams = /* @__PURE__ */ {
      [SnapshotOperation.CreateElement]: { name: 'CreateElement', params: ['type', /* string */ 'id' /* number */] },
      [SnapshotOperation.InsertBefore]: {
          name: 'InsertBefore',
          params: ['parentId', /* number */ 'childId', /* number */ 'beforeId' /* number | undefined */],
      },
      [SnapshotOperation.RemoveChild]: { name: 'RemoveChild', params: ['parentId', /* number */ 'childId' /* number */] },
      [SnapshotOperation.SetAttribute]: {
          name: 'SetAttribute',
          params: ['id', /* number */ 'dynamicPartIndex', /* number */ 'value' /* any */],
      },
      [SnapshotOperation.SetAttributes]: { name: 'SetAttributes', params: ['id', /* number */ 'values' /* any */] },
      [SnapshotOperation.DEV_ONLY_AddSnapshot]: {
          name: 'DEV_ONLY_AddSnapshot',
          params: [
              'uniqID', /* string */
              'snapshotCreator', /* string */
          ],
      },
      [SnapshotOperation.DEV_ONLY_RegisterWorklet]: {
          name: 'DEV_ONLY_RegisterWorklet',
          params: ['hash', /* string */ 'fnStr' /* string */],
      },
  };

  function prettyFormatSnapshotPatch(snapshotPatch) {
    if (!snapshotPatch) {
        return [];
    }
    const result = [];
    for (let i = 0; i < snapshotPatch.length;) {
        const op = snapshotPatch[i];
        const config = SnapshotOperationParams[op];
        if (config) {
            const formattedOp = { op: config.name };
            config.params.forEach((param, index) => {
                formattedOp[param] = snapshotPatch[i + 1 + index];
            });
            result.push(formattedOp);
            i += 1 + config.params.length;
        }
        else {
            throw new Error(`Unknown snapshot operation: ${op}`);
        }
    }
    return result;
  }

  function printSnapshotInstance(instance, log = console.log) {
    const impl = (instance, level) => {
        let msg = '';
        for (let i = 0; i < level; ++i) {
            msg += '  ';
        }
        msg += `| ${instance.id ?? instance.__id}(${instance.type}): ${JSON.stringify((instance.values ?? instance.__values))}`;
        log(msg);
        for (const c of (instance.childNodes ?? instance.children ?? [])) {
            impl(c, level + 1);
        }
    };
    impl(instance, 0);
}

  if (__JS__) {
    const oldOnLifecycleEvent = lynxCoreInject.tt.OnLifecycleEvent;
    lynxCoreInject.tt.OnLifecycleEvent = (...args) => {
      const printArgs = [...args]
      if (args[0][0] === 'rLynxFirstScreen') {
        if (typeof args[0][1].root === 'string') {
          printArgs[0] = args[0].slice()
          const root = JSON.parse(args[0][1].root)
          printArgs[0][1] = {
            ...args[0][1],
            root,
          }
          console.log('[ReactLynxDebug] SnapshotInstance tree for first screen hydration:')
          printSnapshotInstance(root);
        }
      }
      console.log('[ReactLynxDebug] OnLifecycleEvent', JSON.stringify(printArgs, null, 2));

      if (args[0][0] === 'rLynxFirstScreen') {
        console.log('[ReactLynxDebug] BackgroundSnapshotInstance tree before hydrate:')
        printSnapshotInstance(__root);
      }

      oldOnLifecycleEvent(...args);

      if (args[0][0] === 'rLynxFirstScreen') {
        console.log('[ReactLynxDebug] BackgroundSnapshotInstance tree after hydrate:')
        printSnapshotInstance(__root);
      }
    };
  } else {
    console.log('[ReactLynxDebug] globalThis.rLynxChange', globalThis.rLynxChange, typeof globalThis.rLynxChange);
    const oldRLynxChange = globalThis.rLynxChange;
    globalThis.rLynxChange = (...args) => {
      const printArgs = [...args]
      if (typeof args[0].data === 'string') {
        const parsedData = JSON.parse(args[0].data)
        printArgs[0] = {
          ...args[0],
          data: {
            ...parsedData,
            patchList: parsedData.patchList.map(patch => ({
              ...patch,
              snapshotPatch: prettyFormatSnapshotPatch(patch.snapshotPatch)
            }))
          }
        }
      }
      console.log('[ReactLynxDebug] rLynxChange', JSON.stringify(printArgs, null, 2));
      oldRLynxChange(...args);
    };

    const api = [
      '__CreatePage',
      '__CreateElement',
      '__CreateWrapperElement',
      '__CreateText',
      '__CreateImage',
      '__CreateView',
      '__CreateRawText',
      '__CreateList',
      '__AppendElement',
      '__InsertElementBefore',
      '__RemoveElement',
      '__ReplaceElement',
      '__FirstElement',
      '__LastElement',
      '__NextElement',
      '__GetPageElement',
      '__GetTemplateParts',
      '__AddDataset',
      '__SetDataset',
      '__GetDataset',
      '__SetAttribute',
      '__GetAttributes',
      '__GetAttributeByName',
      '__GetAttributeNames',
      '__SetClasses',
      '__SetCSSId',
      '__AddInlineStyle',
      '__SetInlineStyles',
      '__AddEvent',
      '__SetID',
      '__GetElementUniqueID',
      '__GetTag',
      '__FlushElementTree',
      '__UpdateListCallbacks',
      '__OnLifecycleEvent',
      '__QueryComponent',
      '__SetGestureDetector',
    ];

    let count = 0;
    api.forEach(api => {
      const old = globalThis[api];
      globalThis[api] = (...args) => {
        const printArgs = [...args];
        if (
          api === '__AppendElement' ||
          api === '__InsertElementBefore' ||
          api === '__ReplaceElement' ||
          api === '__RemoveElement'
        ) {
          printArgs[0] = __GetTag(args[0]);
          printArgs[1] = __GetTag(args[1]);
        }
        if (api === '__InsertElementBefore') {
          printArgs[2] = __GetTag(args[2]);
        }

        console.log('[ReactLynxDebug-Element] API', ++count, api, ...printArgs);

        lynx.performance.profileStart(api, {
          args: {
            args: JSON.stringify(args),
          },
        });
        const ans = old(...args);
        lynx.performance.profileEnd();
        return ans;
      };
    });
  }
}

root.render(<App />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
