const encodeHexUTF8 = (input) => {
    const cleanedStr = input.replace(/\s+/g, '');

    // 2. Mã hóa bằng UTF-8
    const encoder = new TextEncoder(); // UTF-8 mặc định
    const bytes = encoder.encode(cleanedStr);

    // 3. Chuyển từng byte thành mã hex (2 ký tự)
    return Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

module.exports = encodeHexUTF8