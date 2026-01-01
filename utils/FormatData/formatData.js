export default function formatData(data){
    return data < 10 && data > 0 ? "0" + data : data
}