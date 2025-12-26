// Shared base data for both sides
const baseData = {
  // Main invitation title that appears on the page
  title: "Hồng Phi & Thanh Huyền",
  // Opening message/description of the invitation
  description:
    "Đây là lời mời của chúng tôi để bạn đến dự tiệc cưới của chúng tôi.",
  // Groom's name
  groomName: "Hồng Phi",
  // Bride's name
  brideName: "Thanh Huyền",
  // Groom's parents names
  parentGroom: {
    dad: "Lý Bá Thắng",
    mom: "Nguyễn Thị Tân",
  },
  // Bride's parents names
  parentBride: {
    dad: "Phạm Văn Quyên",
    dad_more: "Cố phụ",
    mom: "Đỗ Thị Vân",
  },
  // Wedding date (format: YYYY-MM-DD)
  date: "2026-01-07",
  // Image that appears when link is shared on social media
  ogImage: "./images/anh-5.jpg",
  // Icon that appears in browser tab
  favicon: "./favicon.png",
  // Google Apps Script Web App key for handling wishes submission
  appScriptKey:
    "AKfycbw18ZRYPgZM2b8r8DXPGRV6BWyv8J09JqPgBlpY_C1R-kV7FVJYUHYDSONCEbf_5EOM0Q",
  // Background music settings (same for both sides)
  audio: {
    // Music file (choose one or replace with your own file)
    src: "./audio/westlife-nothings-gonna-change-my-love-for-you.mp3", // or /audio/nature-sound.mp3
    // Music title to display
    title: "Nothing's Gonna Change My Love For You", // or Nature Sound
    // Whether music plays automatically when website opens
    autoplay: true,
    // Whether music repeats continuously
    loop: true,
    // Duration for which the toast message is displayed
    toastDuration: 1000,
  },
  // List of bank accounts for digital envelope/gifts (same for both sides)
  banks: [
    {
      // Bank name
      bank: "Vietcombank",
      // Account number
      accountNumber: "0011004367073",
      // Account holder name (all uppercase)
      accountName: "LY HONG PHI",
    },
    {
      bank: "Vietcombank",
      accountNumber: "0731000735772",
      accountName: "PHAM THI THANH HUYEN",
    },
    // You can add more banks with the same format
  ],
};

// Venue-specific configurations
const venues = {
  "nha-trai": {
    // Google Maps link for location (short clickable link)
    maps_url: "https://maps.app.goo.gl/1VxiDfVHUDgS86aK7",
    // Google Maps embed code to display map on website
    // How to get: open Google Maps → select location → Share → Embed → copy link
    maps_embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465.7181347589595!2d105.60678145809972!3d20.962750080789895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313451006484676f%3A0xb57395fb4b9b7cff!2zTmjDoCBWxINuIEjDs2EgVGjDtG4gVGjDoWkgS2jDqg!5e0!3m2!1sen!2s!4v1765699865107!5m2!1sen!2s",
    // Event time (free format, example: "10:00 - 12:00 WIB")
    time: "10:30 - 12:00",
    // Venue/building name
    location: "Nhà văn hóa thôn Thái Khê",
    // Full address of the wedding venue
    address: "Thôn Thái Khê, Xã Kiều Phú, Hà Nội",
    // List of event agenda/schedule
    agenda: [
      {
        // Event name
        title: "Lễ thành hôn",
        date: "2026-01-07",
        startTime: "15:00",
        endTime: "16:00",
        location: "Thôn Thái Khê, Xã Kiều Phú, Hà Nội",
        address: "Nhà văn hóa thôn Thái Khê",
        // Google Maps link for location (short clickable link)
        maps_url: "https://maps.app.goo.gl/1VxiDfVHUDgS86aK7",
      },
      {
        // Event name
        title: "Tiệc cưới nhà Trai",
        date: "2026-01-07",
        startTime: "16:00",
        endTime: "19:00",
        location: "Thôn Thái Khê, Xã Kiều Phú, Hà Nội",
        address: "Nhà văn hóa thôn Thái Khê",
        // Google Maps link for location (short clickable link)
        maps_url: "https://maps.app.goo.gl/1VxiDfVHUDgS86aK7",
      },
    ],
  },

  "nha-gai": {
    maps_url: "https://maps.app.goo.gl/eTE7XYQL5Ecorkam7",
    maps_embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1612.7143015552042!2d106.16160766078511!3d21.399833365462186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31356b005c4f5fff%3A0x7d5a5433f242ab45!2zQ2jDuWEgSG_DoCBBbiwgSOG7o3AgxJDhu6ljICwgVMOibiBZw6puICwgQuG6r2MgR2lhbmcgKCBDaMO5YSBRdWFuZyBNaW5oICk!5e0!3m2!1sen!2s!4v1765806646982!5m2!1sen!2s",
    time: "9:00 - 11:00",
    location: "Tư gia nhà gái, cạnh chùa Hoà An, xã Hợp Đức",
    address: "Thôn Hoà An, xã Hợp Đức, huyện Tân Yên, tỉnh Bắc Giang (cũ)",
    agenda: [
      {
        title: "Tiệc cưới nhà Gái",
        date: "2026-01-07",
        startTime: "09:30",
        endTime: "11:00",
        location: "Tư gia nhà gái, cạnh chùa Hoà An, xã Hợp Đức",
        address: "Thôn Hoà An, xã Hợp Đức, huyện Tân Yên, tỉnh Bắc Giang (cũ)",
        maps_url: "https://maps.app.goo.gl/eTE7XYQL5Ecorkam7",
      },
      {
        title: "Lễ vu quy",
        date: "2026-01-07",
        startTime: "11:00",
        endTime: "12:00",
        location: "Tư gia nhà gái, cạnh chùa Hoà An, xã Hợp Đức",
        address: "Thôn Hoà An, xã Hợp Đức, huyện Tân Yên, tỉnh Bắc Giang (cũ)",
        maps_url: "https://maps.app.goo.gl/eTE7XYQL5Ecorkam7",
      },
    ],
  },
};

const config = {
  // Raw venue map, in case you want to access directly
  data: baseData,
  venues,
};

export default config;
