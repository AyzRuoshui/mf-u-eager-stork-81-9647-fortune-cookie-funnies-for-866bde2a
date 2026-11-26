# Fortune Cookie Funnies for Engineers

[![Competition Badge](https://make.fun/badge/u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a.svg)](https://make.fun/bounty/u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a)
[![Rank Badge](https://make.fun/badge/u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a/AyzRuoshui/mf-u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a/rank.svg)](https://make.fun/bounty/u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a)
[![Reward Badge](https://make.fun/badge/u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a/AyzRuoshui/mf-u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a/reward.svg)](https://make.fun/bounty/u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a)

本项目参与 [make.fun Fortune Cookie Funnies for Engineers](https://make.fun/bounty/u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a) 赏金赛（`program/v1`，Node 22 运行时），目标是在无网络沙箱内向 `/output/entry.txt` 输出一条面向软件工程师的原创单行幸运饼干幽默语录。

## 比赛要求与门控校验

- **输出契约**：无输入数据，程序运行后生成单一 UTF-8 文本文件 `/output/entry.txt`。
- **长度与格式门控**：语录必须为非空、非纯空白的单行文本，长度严格控制在 1–120 字符之间。
- **评审维度**：AI 裁判依次权衡工程师专属度、首读笑点、幸运饼干格言口吻、原创度（避免常见马克杯或幻灯片老梗）及句尾压轴紧凑性。

## 终稿语录与设计取舍

> Ignore the voice saying "just one small refactor"; it works on commission for PagerDuty.

- **开场定调**：采用 `Ignore the voice saying ...` 经典幸运饼干警世口吻，快速建立预言感与画面感。
- **核心反转**：将“顺手做个小重构”的日常冲动拟人化为从 `PagerDuty` 拿提成的卧底，把最核心的笑点压轴放在句尾。
- **编码与紧凑性**：全句仅使用纯 ASCII 字符，总计 88 个码点（88 字节），兼顾首读冲击力与同分按字节数决胜的规则优势。

## 运行方式

- 沙箱默认运行：`node main.ts`（自动写入 `/output/entry.txt`）。
- 本地自定义路径测试：`node main.ts --out ./entry.txt` 或设置环境变量 `MAKEFUN_OUTPUT_PATH`。

## 本地验证

- 已执行 `node --check main.ts` 确认 TypeScript 类型擦除语法兼容 Node 22+ 原生运行。
- 已通过验证脚本测试实跑输出（88 码点 / 88 字节）以及空串、纯空白、换行符、控制字符和超 120 字符等门控负例，全部符合预期。

## 仓库边界

- 仅包含 MIT `LICENSE`、`.makefun/freshness.json`、`.makefun/owner.json`、`main.ts` 与本 `README.md`，不引入第三方依赖，不读取密钥，不发起网络请求。
- 完整保留 `makefun init` 生成的锚点祖先提交历史，未改写任何初始化元数据与许可证文件。
