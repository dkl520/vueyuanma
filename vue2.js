//万物起源
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

function Vue(options) {
    if ("development" !== 'production' &&
        !(this instanceof Vue)
    ) {
        warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
}

function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        debugger
        var vm = this;
        // a uid
        vm._uid = uid$3++;
        var startTag, endTag;
        /* istanbul ignore if */
        if ("development" !== 'production' && config.performance && mark) {
            startTag = "vue-perf-start:" + (vm._uid);
            endTag = "vue-perf-end:" + (vm._uid);
            mark(startTag);
        }

        // a flag to avoid this being observed
        vm._isVue = true;
        // merge options
        if (options && options._isComponent) {
            // optimize internal component instantiation
            // since dynamic options merging is pretty slow, and none of the
            // internal component options needs special treatment.
            initInternalComponent(vm, options);
        } else {
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor),
                options || {},
                vm
            );
        }
        /* istanbul ignore else */
        {
            initProxy(vm);
        }
        // expose real self
        vm._self = vm;
        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook(vm, 'beforeCreate');
        initInjections(vm); // resolve injections before data/props
        initState(vm);
        initProvide(vm); // resolve provide after data/props
        callHook(vm, 'created');

        /* istanbul ignore if */
        if ("development" !== 'production' && config.performance && mark) {
            vm._name = formatComponentName(vm, false);
            mark(endTag);
            measure(("vue " + (vm._name) + " init"), startTag, endTag);
        }

        if (vm.$options.el) {
            // 果然￥el方法就是调用$mount
            vm.$mount(vm.$options.el);
        }
    };
}