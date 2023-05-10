import { _decorator, Component, Node, instantiate } from 'cc';
import { SceneConfig } from '../SceneConfig';
const { ccclass, property } = _decorator;

@ccclass('MainScene')
export class MainScene extends tnt.SceneBase {

    onEnterTransitionStart(sceneName?: string): void {
        let btnTemplete = this.getNodeByName("btnTemplete");
        let parent = btnTemplete.parent;
        btnTemplete.removeFromParent();
        for (let i = 0; i < SceneConfig.length; i++) {
            const element = SceneConfig[i];
            let btn = instantiate(btnTemplete);
            btn.name = `btn${element.scene}`;
            btn.parent = parent;
            let label = btn.getChildByName("Label");
            this.setLabelText(label,element.button);
            this.registeButtonClick(btn,()=>{
                tnt.sceneMgr.to(element.scene as any,{bundle: element.bundle});
            });
        }
    }
    
    onEnterTransitionFinished(sceneName?: string): void {

    }

}

