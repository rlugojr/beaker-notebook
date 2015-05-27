;(function(app) {
  app.service('NotebookMenuService', [
    'bkMenuPluginManager',
    'bkHelper',
    'Notebooks',
    function(bkMenuPluginManager, bkHelper, Notebooks) {

      function menuContents($scope) {
        return [
          {
            parent: "Bunsen",
            id: "bunsen-menu",
            items: [
              {
                name: "Save",
                sortorder: 40,
                action: $scope.save,
                tooltip: "Save notebook",
                id: "save-menuitem"
              },
              {
                name: "Save as...",
                sortorder: 50,
                action: $scope.saveAs,
                tooltip: "Copy notebook to another name",
                id: "save-as-menuitem"
              },
              {
                name: "Rename",
                sortorder: 60,
                action: function () {
                  alert('Coming soon!');
                },
                tooltip: "Rename notebook",
                id: "rename-menuitem"
              },
              {
                name: "Close",
                sortorder: 70,
                action: function () {
                  Notebooks.closeNotebook($scope.notebook.current['public-id']);
                },
                tooltip: "Close notebook",
                id: "close-menuitem"
              },
              {
                name: 'Divider',
                sortorder: 80,
                action: function() {},
                tooltip: '',
                id: 'file-functions-divider',
                type: 'divider'
              },
              {
                name: "Language manager...",
                sortorder: 100,
                action: function () {
                  bkHelper.showLanguageManager();
                },
                tooltip: "Show available languages and edit their settings",
                id: "language-manager-menuitem"
              },
              {
                name: 'Show Hierarchy',
                sortorder: 102,
                isChecked: function() {
                  var notebookViewModel = bkHelper.getBkNotebookViewModel();
                  return notebookViewModel.isHierarchyEnabled();
                },
                action: function() {
                  var notebookViewModel = bkHelper.getBkNotebookViewModel();
                  notebookViewModel.toggleHierarchyEnabled();
                },
                id: "show-hierarchy-menuitem"
              },
              {
                name: 'Advanced Mode',
                sortorder: 105,
                isChecked: function() {
                  var notebookViewModel = bkHelper.getBkNotebookViewModel();
                  return notebookViewModel.isAdvancedMode();
                },
                action: function() {
                  var notebookViewModel = bkHelper.getBkNotebookViewModel();
                  notebookViewModel.toggleAdvancedMode();
                  bkHelper.httpPost(bkHelper.serverUrl("beaker/rest/util/setUseAdvancedMode"), {
                    advancedmode: notebookViewModel.isAdvancedMode()
                  });
                },
                id: "advanced-mode-menuitem"
              },
              {
                name: "Show stdout/stderr",
                sortorder: 107,
                action: function () {
                  bkHelper.getBkNotebookViewModel().toggleShowOutput();
                },
                tooltip: "Show or hide the stdout and stderr.",
                isChecked: function() {
                  var notebookViewModel = bkHelper.getBkNotebookViewModel();
                  if (notebookViewModel) {
                    return notebookViewModel.isShowingOutput();
                  }
                },
                id: "stdout-stderr-menuitem"
              },
              {
                name: "Lock",
                sortorder: 110,
                action: function () {
                  bkHelper.toggleNotebookLocked();
                },
                tooltip: "Lock notebook from further editing",
                isChecked: function () {
                  return bkHelper.isNotebookLocked();
                },
                id: "lock-menuitem"
              },
              {
                name: 'Delete all output cells',
                sortorder: 120,
                action: function () {
                  bkHelper.deleteAllOutputCells();
                },
                tooltip: 'Deletes all of the output cells.',
                id: "delete-all-menuitem"
              },
              {
                name: "Run all cells",
                sortorder: 130,
                action: function() {
                  bkHelper.evaluateRoot("root");
                },
                tooltip: "Run all cells",
                id: "run-all-cells-menuitem"
              },
              {
                name: 'Collapse All Sections',
                sortorder: 135,
                action: bkHelper.collapseAllSections,
                id: "collapse-all-menuitem"
              },
              {
                name: "Edit mode",
                sortorder: 140,
                id: "edit-mode-menuitem"
              }
            ]
          },
          {
            parent: "Bunsen",
            submenu: "Edit mode",
            id: "edit-mode-menuitem",
            items: [
              {
                name: "Normal",
                sortorder: 100,
                id: "normal-edit-mode-menuitem",
                isChecked: function () {
                  return bkHelper.getInputCellKeyMapMode() === "default";
                },
                action: function () {
                  bkHelper.setInputCellKeyMapMode("default");
                }
              },
              {
                name: "Vim",
                sortorder: 120,
                id: "vim-edit-mode-menuitem",
                isChecked: function () {
                  return bkHelper.getInputCellKeyMapMode() === "vim";
                },
                action: function () {
                  bkHelper.setInputCellKeyMapMode("vim");
                }
              },
              {
                name: "Emacs",
                sortorder: 110,
                id: "emacs-edit-mode-menuitem",
                isChecked: function () {
                  return bkHelper.getInputCellKeyMapMode() === "emacs";
                },
                action: function () {
                  bkHelper.setInputCellKeyMapMode("emacs");
                }
              }
            ]
          }
        ]
      }

      function existingBunsenMenu() {
        return _.chain(bkMenuPluginManager.getMenus()).values().findWhere(
          {classNames: 'bunsen-menu'}).value();
      }


      return {
        menuItems: function($scope) {
          if (existingBunsenMenu() === void(0)) {
            bkMenuPluginManager.attachMenus(menuContents($scope));
          }
          return existingBunsenMenu().items;
        }
      };
    }]);
})(window.bunsen);
