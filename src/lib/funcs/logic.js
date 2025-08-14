const checkPrompt = (prompt) => {
    let message = `
        # bạn hãy tóm tắt câu hỏi/câu trần thuật có trong văn bản thành mảng những câu truy vấn vector db tối ưu nhất!!!
        # tối thiểu truy vấn là tốt nhất!!!
        ### Văn bản nhập vào: ${prompt}
    `
    return message
}

const formatData = (response = "", startWith = "", endWith = "") => {
    let data = "";
    for (let i = 0; i < response.length; i++) {
        if (response[i] === startWith || data.includes(startWith)) data += response[i];
        if (response[i] === endWith) break;
    }
    return data;
}

const lastQuestion = (data = "", ask = "") => {
    const message = `
        # Bạn hãy phân tích và tổng hợp dữ liệu sau:
            - Dữ liệu: '${data}}'
        => Rồi trả lời câu hỏi sau (không ghi nguồn dữ liệu): '${ask}'
        !!! Nếu dữ liệu không liên quan tới câu hỏi trả lời: Xin lỗi bạn! Hiện không có dữ liệu bạn cần |>_<|`
    return message
}

const aiModels = {
    "gemma2_9b_it": "gemma2-9b-it",
    "llama_3_1_8b_instant": "llama-3.1-8b-instant",
    "llama_3_3_70b_8192": "llama-3.3-70b-8192",
    "llama_3_3_70b_versatile": "llama-3.3-70b-versatile",
    "meta_llama_llama_guard_4_12b": "meta-llama/llama-guard-4-12b",
    "whisper_large_v3": "whisper-large-v3",
    "whisper_large_v3_turbo": "whisper-large-v3-turbo"
}

const randomId = (length = 10) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = { checkPrompt, formatData, lastQuestion, aiModels, randomId };