#!/bin/sh

CID="freeswitch"
# CIP=$(sudo docker inspect --format='{{.NetworkSettings.IPAddress}}' $CID)
CIP=172.29.0.4

FS_RTP_START_PORT=16384
FS_RTP_END_PORT=16640

sudo iptables -A DOCKER -t nat -p udp -m udp ! -i docker0 --dport $FS_RTP_START_PORT:$FS_RTP_END_PORT -j DNAT --to-destination $CIP:$FS_RTP_START_PORT-$FS_RTP_END_PORT
sudo iptables -A DOCKER -p udp -m udp -d $CIP/32 ! -i docker0 -o docker0 --dport $FS_RTP_START_PORT:$FS_RTP_END_PORT -j ACCEPT
sudo iptables -A POSTROUTING -t nat -p udp -m udp -s $CIP/32 -d $CIP/32 --dport $FS_RTP_START_PORT:$FS_RTP_END_PORT -j MASQUERADE
