#!/bin/bash
# 清屏
clear
# 不接受参数
if [[ $# -eq 0 ]]
then
    # 启动程序
    pm2 start bin/www

    # 脚本休眠2s，等待进程启动
    sleep 2
    while true
    do
        # 获取pid
        pid=$(pm2 list | grep www | awk '{print $8}')

        if [ ! $pid ]
        then
            echo "nodejs进程未找到，程序退出！"
            break
        fi

        # 获取cpu
        cpu=$(ps -p $pid -o pcpu | grep -v CPU | cut -d . -f 1 | awk '{print $1}')

        if [ $cpu -ge 98 ]
        then
            echo "cpu占用率大于等于98%，nodejs服务需要重启"
            # 重启程序
            pm2 restart all
            # 脚本休眠1s，等待进程启动
            sleep 1
        else
            echo "pid: $pid nodejs运行正常，3s后重新检测"
            sleep 3
        fi
    done
fi