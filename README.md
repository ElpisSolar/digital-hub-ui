# set-up instructions

```bash
# download latest raspbian software
wget https://downloads.raspberrypi.org/raspbian_full_latest

# flash microSD card with this image using balenaEtcher
# enter Raspberry Pi terminal

# create digitalhub directory and change into it
mkdir ~/digital-hub; cd ~/digital-hub

# download kiwix-tools arm build
wget https://download.kiwix.org/nightly/2019-07-10/kiwix-tools_linux-armhf-2019-07-10.tar.gz

# extract kiwix tools and remove zipped file
tar -xvzf kiwix-tools_linux-armhf-2019-07-10.tar.gz; rm -rf kiwix-tools_linux-armhf-2019-07-10.tar.gz

# copy all kiwix content
cp -a /media/pi/tresor-prt2/kiwix-content .

# download nginx
apt-get install nginx

# download site repository
git clone https://github.com/samkellerhals/digital-information-hub-rpi.git

# change nginx default config to front-end root
root /home/pi/digital-hub/digital-information-hub-rpi;

# restart nginx
sudo service nginx restart

# add cron job to run kiwix server
crontab -e

# define cronjob to run script on reboot
@reboot /home/pi/digital-hub/digital-information-hub-rpi/boot-wap-setup.sh

## SETUP WAP ##

# install dnsmasq and hostapd
sudo apt install dnsmasq hostapd

# configure static ip
sudo nano /etc/dhcpcd.conf

# add following to dhcpcd.conf
interface wlan0
    static ip_address=10.10.0.1/24
    nohook wpa_supplicant

# restart dhcpcd daemon - (you lose access to wireless interfaces at this point)
sudo systemctl restart dhcpcd

# rename unneeded default dnsmasq.conf
sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig

# create new dnsmasq.conf to setup DHCP server
sudo nano /etc/dnsmasq.conf

# add the following to dnsmasq.conf
interface=wlan0
dhcp-range=10.10.0.2,10.10.0.20,255.255.255.0,24h

# reload dnsmasq
sudo systemctl reload dnsmasq

# create hostapd.conf file
sudo nano /etc/hostapd/hostapd.conf

# add following to hostapd.conf
interface=wlan0
driver=nl80211
ssid=NameOfNetwork
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
ignore_broadcast_ssid=0

# add hostapd configuration to hostapd initscript
sudo nano /etc/default/hostapd

# add following to hostapd initscript
DAEMON_CONF="/etc/hostapd/hostapd.conf"

# enable and start hostapd
sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl start hostapd

# edit sysctl.conf
sudo nano /etc/sysctl.conf

# uncomment following in sysctl.conf
net.ipv4.ip_forward=1

# add masquerade for outbound traffic on eth0
sudo iptables -t nat -A  POSTROUTING -o eth0 -j MASQUERADE

# save iptables rule
sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"

# edit rc.local
sudo nano /etc/rc.local

# add following to rc.local above exit 0
iptables-restore < /etc/iptables.ipv4.nat
```
