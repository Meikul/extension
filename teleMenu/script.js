// (function(){
  $(document).ready(function () {
    var $inputs = $('#settings input');

    $inputs.on('input', function () {
      var val = this.value;
      var selector = $(this).attr('data-target');
      var prop = $(this).attr('data-prop');
      var $target = $(selector);
      $target.css(prop, val);
    });

    var $resets = $('#settings .reset');
    $resets.on('click', function () {
      var $input = $(this).nextAll('input').first();
      var valAttr = $input.attr('value');
      $input.val(valAttr).trigger('input');
    });

    $('#add-preset-btn').on('click', newPreset);

    $(document).on('presets:update', generatePresetList);

    const originalTemplateData = {
      botBorderColor: "#CCC",
      botBorderStyle: "solid",
      botColor: "#FFFFFF",
      botTextColor: "#0F2A3B",
      logoColor: "#0F2A3B",
      topColor: "#0F2A3B",
      topTextColor: "#FFFFFF"
    };

    const originalTemplate = new presetObj(originalTemplateData, false);
    setPreset('Original', originalTemplate);

    var $presetsList = $('#presets-list');
    $presetsList.on('click', '.list-group-item', activatePreset);
    $presetsList.on('click', '.list-group-item .fa-trash', function () {
      const name = $(this).closest('.list-group-item').find('span').html();
      if(window.confirm(`Do you want to delete ${name}?`)) removePreset(name);
    });
    $presetsList.on('click', '.list-group-item .fa-pen', function () {
      const name = $(this).closest('.list-group-item').find('span').html();
      const newName = nonemptyPrompt(`Rename ${name}`);
      if(newName != null) {
        const presets = getPresets();
        const presetData = presets[name];
        removePreset(name);
        setPreset(newName, presetData);
      }
    })
  });

  function presetObj(props, editable = true) {
    if(!props) props = {};
    return {
      editable,
      props
    };
  }

  function nonemptyPrompt(msg) {
    let response = '';
    while(!(/\w/).test(response)){
      response = window.prompt(msg);
    }
    return response;
  }

  function newPreset(){
    let name = nonemptyPrompt('Name Preset')
    if(name != null) {
      const presets = getPresets();
      if(!presets[name] || presets[name].editable){
        const formData = getFormData();
        const data = {editable: true, props: formData};
        setPreset(name, data);
      }
    }
  }

  function generatePresetList() {
    const allPresets = getPresets();
    let $list = $('#presets-list');
    $list.empty();
    for (presetName in allPresets){
      let preset = allPresets[presetName];
      const renameIcon = preset.editable ? '<em class="fa fa-pen pull-right">&nbsp;</em>' : '';
      const removeIcon = preset.editable ? '<em class="fa fa-trash pull-right">&#8203;</em>' : '';
      var template = `<a class="list-group-item list-group-item-action">
        <span>${presetName}</span>
        ${removeIcon}
        ${renameIcon}
      </a>`;
      $list.append(template);
    }
  }

  function activatePreset() {
    const $listItem = $(this);
    const name = $listItem.find('span').html();
    const preset = getPresets()[name];
    if(preset) {
      var $settings = $('#settings');
      for(prop in preset.props){
        const inputName = prop.replace(/[A-Z]/g, g => {
          const name = '-'+g.toLowerCase();
          return name;
        });
        $settings.find(`[name=${inputName}]`).val(preset.props[prop]).trigger('input');
      }
    }
  }
  
  function getFormData() {
    var $settings = $('#settings');
    var formArray = $settings.serializeArray();
    var formData = {};
    formArray.forEach(item => {
      const camelName = item.name.replace(/-([a-z])/g, g => g[1].toUpperCase());
      formData[camelName] = item.value
    });
    return formData;
  }
  
  function getPresets() {
    let presets = localStorage.getItem('presets');
    try {
      presets = JSON.parse(presets);
    } catch (error) {
      presets = {};
    }
    if(!presets) presets = {};
    return presets;
  }

  function removePreset(name) {
    let presets = getPresets();
    delete presets[name];
    console.log(presets);
    presets = JSON.stringify(presets);
    storeItem('presets', presets);
  }

  function setPreset(name, data) {
    let presets = getPresets();
    presets[name] = data;
    presets = JSON.stringify(presets);
    storeItem('presets', presets);
  }

  function storeItem(name, data) {
    localStorage.setItem(name, data);
    $(document).trigger('presets:update');
  }
// })();
