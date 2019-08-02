const isJsreportPluginExisted = !!(Meteor.settings.plugins && Meteor.settings.plugins.length && Meteor.settings.plugins.indexOf("@steedos/plugin-jsreport") >= 0);
Creator.Objects.reports = {
  name: "reports",
  label: "报表",
  icon: "report",
  enable_space_global: true,
  fields: {
    name: {
      label: "名称",
      type: "text",
      required: true,
      searchable: true,
      index: true
    },
    report_type: {
      label: "报表类型",
      type: "select",
      defaultValue: "tabular",
      options: (() => {
        let types = [
          {
            label: "表格",
            value: "tabular"
          }, {
            label: "摘要",
            value: "summary"
          }, {
            label: "矩阵",
            value: "matrix"
          }
        ];
        if (isJsreportPluginExisted) {
          types.push({
            label: "JsReport",
            value: "jsreport"
          });
        }
        return types;
      })()
    },
    data_source: {
      label: "报表数据来源",
      type: "select",
      defaultValue: "odata",
      options: [
        {
          label: "OData",
          value: "odata"
        }, {
          label: "Graphql",
          value: "graphql"
        }
      ]
    },
    object_name: {
      label: "对象名",
      type: "lookup",
      optionsFunction: function () {
        var _options;
        _options = [];
        _.forEach(Creator.Objects, function (o, k) {
          return _options.push({
            label: o.label,
            value: k,
            icon: o.icon
          });
        });
        return _options;
      },
      required: true
    },
    filter_scope: {
      label: "过虑范围",
      type: "select",
      defaultValue: "space",
      hidden: true,
      options: [
        {
          label: "所有",
          value: "space"
        }, {
          label: "与我相关",
          value: "mine"
        }
      ]
    },
    filters: {
      label: "过滤条件",
      type: "[Object]",
      omit: true
    },
    "filters.$": {
      label: "过滤器",
      blackbox: true,
      omit: true,
      hidden: true
    },
    "filters.$.field": {
      label: "字段名",
      type: "text"
    },
    "filters.$.operation": {
      label: "操作符",
      type: "select",
      defaultValue: "=",
      options: function () {
        return Creator.getFieldOperation();
      }
    },
    "filters.$.value": {
      label: "字段值",
      blackbox: true
    },
    filter_logic: {
      label: "过滤逻辑",
      type: "text",
      omit: true
    },
    fields: {
      label: "字段",
      type: "lookup",
      multiple: true,
      is_wide: true,
      depend_on: ["object_name"],
      defaultIcon: "service_contract",
      optionsFunction: function (values) {
        return Creator.getObjectLookupFieldOptions(values != null ? values.object_name : void 0, true, true);
      }
    },
    rows: {
      label: "行",
      type: "lookup",
      multiple: true,
      is_wide: true,
      depend_on: ["object_name"],
      defaultIcon: "service_contract",
      optionsFunction: function (values) {
        return Creator.getObjectLookupFieldOptions(values != null ? values.object_name : void 0, true, true);
      }
    },
    columns: {
      label: "列",
      type: "lookup",
      multiple: true,
      is_wide: true,
      depend_on: ["object_name"],
      defaultIcon: "service_contract",
      optionsFunction: function (values) {
        return Creator.getObjectLookupFieldOptions(values != null ? values.object_name : void 0, true, true);
      }
    },
    values: {
      label: "统计",
      type: "lookup",
      multiple: true,
      is_wide: true,
      depend_on: ["object_name"],
      defaultIcon: "service_contract",
      optionsFunction: function (values) {
        return Creator.getObjectLookupFieldOptions(values != null ? values.object_name : void 0, true, true);
      }
    },
    filter_fields: {
      label: "默认过虑字段",
      type: "grid",
      is_wide: true
    },
    "filter_fields.$": {
      label: "默认过虑字段",
      blackbox: true,
      type: "Object"
    },
    "filter_fields.$.field": {
      label: "字段名称",
      type: "lookup",
      depend_on: ["object_name"],
      optionsFunction: function (values) {
        return Creator.getObjectFilterFieldOptions(values != null ? values.object_name : void 0);
      }
    },
    "filter_fields.$.required": {
      label: "必填",
      type: "boolean"
    },
    options: {
      label: "操作",
      omit: true,
      blackbox: true
    },
    description: {
      label: "描述",
      type: "textarea",
      is_wide: true
    },
    charting: {
      label: "显示图表",
      type: "boolean",
      defaultValue: true
    },
    grouping: {
      label: "显示小计",
      type: "boolean",
      defaultValue: true
    },
    totaling: {
      label: "显示总计",
      type: "boolean",
      defaultValue: true
    },
    counting: {
      label: "显示记录计数",
      type: "boolean",
      defaultValue: true
    },
    graphql: {
      label: "Graphql",
      type: "textarea",
      is_wide: true,
      hidden: !isJsreportPluginExisted,
      group: "JsReport"
    },
    html: {
      label: "Html",
      type: "textarea",
      is_wide: true,
      hidden: !isJsreportPluginExisted,
      group: "JsReport"
    },
    helper: {
      label: "Helper",
      type: "textarea",
      is_wide: true,
      hidden: !isJsreportPluginExisted,
      group: "JsReport"
    },
    script: {
      label: "Script",
      type: "textarea",
      is_wide: true,
      hidden: !isJsreportPluginExisted,
      group: "JsReport"
    }
  },
  list_views: {
    "default": {
      columns: ["name", "report_type", "object_name"]
    },
    all: {
      label: "所有报表",
      filter_scope: "space",
      filter_fields: ["report_type", "created"]
    },
    application: {
      label: "应用报表",
      filter_scope: "space",
      filters: function () {
        var object_names;
        object_names = Creator.getAppObjectNames();
        return [["object_name", "=", object_names]];
      },
      filter_fields: ["report_type", "created"]
    },
    mine: {
      label: "我的报表",
      filter_scope: "mine",
      filter_fields: ["report_type", "created"]
    },
    global: {
      label: "标准报表",
      filter_scope: "space",
      filters: [["space", "=", 'global']],
      filter_fields: ["report_type", "created"]
    }
  },
  permission_set: {
    user: {
      allowCreate: true,
      allowDelete: true,
      allowEdit: true,
      allowRead: true,
      modifyAllRecords: false,
      viewAllRecords: true,
      disabled_list_views: ["all"]
    },
    admin: {
      allowCreate: true,
      allowDelete: true,
      allowEdit: true,
      allowRead: true,
      modifyAllRecords: true,
      viewAllRecords: true
    }
  }
};