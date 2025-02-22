import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media found'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  m.reply(`📮 *𝙻𝚒𝚗𝚔 :*
${link}
📊 *𝚄𝙺𝚄𝚁𝙰𝙽 𝙵𝙸𝙻𝙴 :* ${media.length} Byte
📛 *𝙴𝚡𝚙𝚒𝚛𝚎𝚍 :* ${isTele ? 'No Expiry Date' : 'Unknown'}`)
}
handler.help = ['upload (reply media)', 'tourl (reply media)']
handler.tags = ['tools']
handler.command = /^(tourl|upload)$/i

export default handler
