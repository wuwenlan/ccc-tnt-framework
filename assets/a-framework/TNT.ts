

import { profiler, EffectAsset, game } from "cc";

declare global {

    interface ITbl { }
    interface IGame { }
    interface IUtils { }
    interface ITiled { }

    interface ITNT {
        options: IStartupOptions;

        /**表格全局 */
        tbl: ITbl;

        /**游戏业务全局 */
        game: IGame;

        /** 工具全局 */
        utils: IUtils;

        /** TiledMap */
        tiled: ITiled;

        startup(options?: IStartupOptions);
        enableTimer();


        /** TNT 框架初始化完成事件 */
        readonly EVENT_TNT_INITED;

        /** 框架启动 */
        readonly EVENT_TNT_STARTUP;
    }

    const tnt: ITNT;

    interface IStartupOptions {
        /**
         * 调试模式
         * @type {boolean}
         */
        debug?: boolean;

        /**
         * 默认按钮音效
         * @type {string}
         */
        defaultBtnSound?: string;
        /**
         * 设置默认 `Bundle` ，不设置则为 `resources`
         * @type {string}
         */
        defaultBundle?: string;

        /**
         * 开启键盘组合键
         * @type {boolean}
         */
        enableKeyboardCombination?: boolean;

        /**
         * 音效配置
         * @type {AudioMgrOptions}
         */
        audioConfig?: AudioMgrOptions;

        /**
         * 多语言配置
         * @type {I18NConfig}
         */
        i18nConfig?: I18NConfig;

        /** 音效配置，键名为 节点名 */
        soundConfig?: { [k in string]: string };
    }
}

tnt.startup = (options?: IStartupOptions) => {

    defineTNTOptions(options);
    tnt.options = options;
    tnt.keyboard.enableCombination = options.enableKeyboardCombination ?? tnt.keyboard.enableCombination;
    tnt.AssetLoader.defaultBundle = options.defaultBundle ?? tnt.AssetLoader.defaultBundle;
    options?.audioConfig && tnt.audioMgr.init(options?.audioConfig);
    options?.i18nConfig && tnt.i18n.init(options?.i18nConfig);
    tnt._decorator._registePlugins();
    options.debug && profiler?.showStats();


    game.emit(tnt.EVENT_TNT_STARTUP);
    tnt.eventMgr.emit(tnt.EVENT_TNT_STARTUP);
    // 加载内置 EffectAsset
    tnt.loaderMgr.share.loadDir("framework#resources/shader/effect", EffectAsset, (err, assets) => {
        if (err) {
            console.warn(`TNT-> 加载内置 EffectAsset 错误。 `, err);
            return;
        }
        assets.forEach((asset) => {
            EffectAsset.register(asset);
        });
    });
}

function defineTNTOptions(options?: IStartupOptions) {
    let _debug = options.debug;
    Object.defineProperty(options, "debug", {
        set(v) {
            if (_debug === v) {
                return;
            }
            _debug = v;
            _debug ? profiler?.showStats() : profiler?.hideStats();
        },
        get() {
            return _debug;
        },
    });
}

export { };