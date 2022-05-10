const envList = [{"envId":"cloud1-6gnuhn9p12e5fa11","alias":"cloud1"}]
const isMac = false
module.exports = {
    envList,
    isMac,
}
// posenet 模型相关地址
export const POSENET_URL = 'https://636c-cloud1-6gnuhn9p12e5fa11-1310569801.tcb.qcloud.la/posnet/model.json';
export const POSENET_BIN_URL = 'https://636c-cloud1-6gnuhn9p12e5fa11-1310569801.tcb.qcloud.la/posnet/group1-shard1of1.bin';
// coco-ssd 模型的地址
export const SSD_NET_URL = 'https://ai.flypot.cn/models/coco-ssd/model.json';
export const SSD_NET_BIN_URL1 = 'https://ai.flypot.cn/models/mobilenet/group1-shard1of3.bin';
export const SSD_NET_BIN_URL2 = 'https://ai.flypot.cn/models/mobilenet/group1-shard2of3.bin';
export const SSD_NET_BIN_URL3 = 'https://ai.flypot.cn/models/mobilenet/group1-shard3of3.bin';