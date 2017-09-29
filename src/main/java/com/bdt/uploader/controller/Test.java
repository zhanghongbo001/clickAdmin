package com.bdt.uploader.controller;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

/**
 * Created by ZhangHongBo on 2017/9/29.
 */
public class Test {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("127.0.0.1");
        String keys = "name";
        // 存数据
        jedis.set(keys, "snowolf");
        // 取数据
        String value = jedis.get(keys);

        System.out.println(value);
    }
}
