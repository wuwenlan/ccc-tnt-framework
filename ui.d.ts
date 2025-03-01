import { RedPointComp } from "./assets/a-framework/red-point/RedPointComp"
import { LoadingTips } from "./assets/bundles/common-bundle/scripts/prefabs/LoadingTips"
import { VMItem } from "./assets/bundles/mvvm-example/scripts/VMItem"
import { RedPointCompProxy } from "./assets/bundles/red-point-example/scripts/RedPointCompProxy"
import { AlchemyPopup } from "./assets/bundles/red-point-example/scripts/view/AlchemyPopup"
import { DanfangPopup } from "./assets/bundles/red-point-example/scripts/view/DanfangPopup"
import { MailPopup } from "./assets/bundles/red-point-example/scripts/view/MailPopup"
import { AutoCloseWindow } from "./assets/bundles/window-example/scripts/AutoCloseWindow"
import { DialogWindow } from "./assets/bundles/window-example/scripts/DialogWindow"
import { UIEmbedItem } from "./assets/bundles/window-example/scripts/embeds/UIEmbedItem"
import { UIEmbedPanel1 } from "./assets/bundles/window-example/scripts/embeds/UIEmbedPanel1"
import { UIEmbedPanel2 } from "./assets/bundles/window-example/scripts/embeds/UIEmbedPanel2"
import { UIEmbedPanel3 } from "./assets/bundles/window-example/scripts/embeds/UIEmbedPanel3"
import { EmbedWindow } from "./assets/bundles/window-example/scripts/EmbedWindow"
import { PauseWindow } from "./assets/bundles/window-example/scripts/PauseWindow"
import { TopMenuBar } from "./assets/bundles/window-example/scripts/topMenuBar/TopMenuBar"
import { VictoryWindow } from "./assets/bundles/window-example/scripts/VictoryWindow"

declare global {
	interface RedPointCompOptions{}
	interface LoadingTipsOptions{}
	interface VMItemOptions{}
	interface RedPointCompProxyOptions{}
	interface AlchemyPopupOptions{}
	interface DanfangPopupOptions{}
	interface MailPopupOptions{}
	interface AutoCloseWindowOptions{}
	interface DialogWindowOptions{}
	interface UIEmbedItemOptions{}
	interface UIEmbedPanel1Options{}
	interface UIEmbedPanel2Options{}
	interface UIEmbedPanel3Options{}
	interface EmbedWindowOptions{}
	interface PauseWindowOptions{}
	interface TopMenuBarOptions{}
	interface VictoryWindowOptions{}

	interface GlobalWindowType{
		"AlchemyPopup": {
			ctor: AlchemyPopup,
			options: AlchemyPopupOptions,
		}
		"DanfangPopup": {
			ctor: DanfangPopup,
			options: DanfangPopupOptions,
		}
		"MailPopup": {
			ctor: MailPopup,
			options: MailPopupOptions,
		}
		"AutoCloseWindow": {
			ctor: AutoCloseWindow,
			options: AutoCloseWindowOptions,
		}
		"DialogWindow": {
			ctor: DialogWindow,
			options: DialogWindowOptions,
		}
		"EmbedWindow": {
			ctor: EmbedWindow,
			options: EmbedWindowOptions,
		}
		"PauseWindow": {
			ctor: PauseWindow,
			options: PauseWindowOptions,
		}
		"VictoryWindow": {
			ctor: VictoryWindow,
			options: VictoryWindowOptions,
		}
	}
	interface GlobalUIType{
		"RedPointComp": {
			ctor: RedPointComp,
			options: RedPointCompOptions,
		}
		"LoadingTips": {
			ctor: LoadingTips,
			options: LoadingTipsOptions,
		}
		"VMItem": {
			ctor: VMItem,
			options: VMItemOptions,
		}
		"RedPointCompProxy": {
			ctor: RedPointCompProxy,
			options: RedPointCompProxyOptions,
		}
		"UIEmbedItem": {
			ctor: UIEmbedItem,
			options: UIEmbedItemOptions,
		}
		"UIEmbedPanel1": {
			ctor: UIEmbedPanel1,
			options: UIEmbedPanel1Options,
		}
		"UIEmbedPanel2": {
			ctor: UIEmbedPanel2,
			options: UIEmbedPanel2Options,
		}
		"UIEmbedPanel3": {
			ctor: UIEmbedPanel3,
			options: UIEmbedPanel3Options,
		}
		"TopMenuBar": {
			ctor: TopMenuBar,
			options: TopMenuBarOptions,
		}
	}
}