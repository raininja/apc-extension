define(
  ['module', 'require', 'vs/platform/instantiation/common/instantiationService', 'apc/patch', 'apc/auxiliary', 'apc/ui'],
  (module, r, insantiationService, patch, auxiliary, ui) => {
    try {
      const [instantiationServiceKey, InstantiationServiceClass] = auxiliary.findInPrototype(insantiationService, 'InstantiationService', 'createInstance');

      const url = r.toUrl(module.id) + '.css';
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = !url.startsWith('file://') && !url.startsWith('vscode-file://') ? 'file://' + url : url;
      document?.head?.appendChild(link);

      if (InstantiationServiceClass) {
        insantiationService[instantiationServiceKey] = class InstantiationService extends InstantiationServiceClass {
          constructor(_services) {
            super(...arguments);
            patch.run(this);
          }
        };
      }

    } catch (e) {
      console.error("Couldn't initialize apc", e);
    }
  });
