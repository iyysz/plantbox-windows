# 达丰智慧仓储

三维仓储作业桌面演示。基于 React、TypeScript、React Three Fiber 与 Three.js，在本地窗口中展示园区、装卸流程、库存与运单数据。

本仓库同时提供 Windows 便携版（见 [Releases](https://github.com/iyysz/plantbox-windows/releases)）与可重新打包的源码。

## 功能概览

- 浏览三维仓储园区（仓库、货架、月台、堆场等）
- 模拟卡车入场、靠台、装卸、出场
- 叉车托盘动画与作业管理面板
- 库存 / 运单等演示数据（纯前端，刷新后重置）

## 本地运行（浏览器）

需要 Node.js 24.14+。

```sh
npm install
npm run dev
```

浏览器打开提示的本地地址（默认中文：`/#/zh`）。

## 打包 Windows 便携版 exe

```sh
npm install
npm run electron:build
```

生成文件位于 `release/Dafeng-Smart-Warehouse-portable.exe`（约 90MB+）。  
也可使用：

```sh
npm run electron:pack
```

## 说明

- 数据仅存于当前会话内存，不连接真实 WMS / ERP / 现场设备。
- 三维场景与业务逻辑源自开源项目 [workbzw/plantbox](https://github.com/workbzw/plantbox)，本仓库为重新品牌化（达丰智慧仓储）的桌面打包分支，已移除界面中的 GitHub / 文档外链。
- 遵循上游 LICENSE（MIT）。

## 页面路由

| 页面     | 中文           | English          |
| -------- | -------------- | ---------------- |
| 首页     | `/#/zh`        | `/#/en`          |
| 完整演示 | `/#/zh/demo`   | `/#/en/demo`     |
| 作业管理 | `/#/zh/operations` | `/#/en/operations` |
