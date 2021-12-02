# 实时班车信息

因为园区会不定期更新班车信息，园区提供的班车公众号提供了很多冗余信息，于是动手做了一个Telegram Bot来获取实时的班车信息

```bash
/bus 获取全部路线
/bus/:lineNo 获取`${lineNo}`号线班车信息
```

机器人名称：[bus_sanlin_bot](https://t.me/bus_sanlin_bot)

## uses

- telegram bot
- fastify
