export default function (Vue, {
    head
}) {
    console.log("plugin-remark-embed client called");
    head.script.push({
        src: 'https://www.example.com/my-script.js'
    })
}