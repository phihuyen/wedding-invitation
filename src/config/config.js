const config = {
  data: {
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
    parentGroom: "Lý Bá Thắng & Nguyễn Thị Tân",
    // Bride's parents names
    parentBride: "Phạm Văn Quyên & Đỗ Thị Vân",
    // Wedding date (format: YYYY-MM-DD)
    date: "2026-01-07",
    // Google Maps embed code to display map on website
    // How to get: open Google Maps → select location → Share → Embed → copy link
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
    // Image that appears when link is shared on social media
    ogImage: "/images/7a690c70cd6f4031197e12.jpg",
    // Icon that appears in browser tab
    favicon: "./favicon.png",
    // Google Apps Script Web App key for handling wishes submission
    appScriptKey:
      "AKfycbxX8xqyU5LSt7LFaMtF46mrSPxz6BD7k7BLcd9JKTa0hL3qXuP7EiSN0URrklBrCHWXUQ",
    // List of event agenda/schedule
    agenda: [
      {
        // First event name
        title: "Tiệc cưới nhà Trai",
        date: "2026-01-07",
        startTime: "16:00",
        endTime: "19:00",
        location: "Thôn Thái Khê, Xã Kiều Phú, Hà Nội",
        address: "Nhà văn hóa thôn Thái Khê",
        // Google Maps link for location (short clickable link)
        maps_url: "https://maps.app.goo.gl/1VxiDfVHUDgS86aK7",
      },
      {
        // First event name
        title: "Tiệc áp rạp nhà Trai",
        date: "2025-11-22",
        startTime: "16:00",
        endTime: "19:00",
        location: "Thôn Thái Khê, Xã Kiều Phú, Hà Nội",
        address: "Nhà văn hóa thôn Thái Khê",
        // Google Maps link for location (short clickable link)
        maps_url: "https://maps.app.goo.gl/1VxiDfVHUDgS86aK7",
      },
      {
        // First event name
        title: "Tiệc cưới nhà Trai",
        date: "2025-11-23",
        startTime: "09:00",
        endTime: "12:00",
        location: "Thôn Thái Khê, Xã Kiều Phú, Hà Nội",
        address: "Nhà văn hóa thôn Thái Khê",
        // Google Maps link for location (short clickable link)
        maps_url: "https://maps.app.goo.gl/1VxiDfVHUDgS86aK7",
      },
    ],

    // Background music settings
    audio: {
      // Music file (choose one or replace with your own file)
      src: "./audio/a-thousand-years.mp3", // or /audio/nature-sound.mp3
      // Music title to display
      title: "A Thousand Years", // or Nature Sound
      // Whether music plays automatically when website opens
      autoplay: true,
      // Whether music repeats continuously
      loop: true,
      // Duration for which the toast message is displayed
      toastDuration: 1000,
    },

    // List of bank accounts for digital envelope/gifts
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
  },
};

export default config;
