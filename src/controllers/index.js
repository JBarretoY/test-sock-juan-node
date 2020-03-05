
class Index
{
    static index(request, response) {
        return response.render("index", { title: "Sockets" });
    }
}

module.exports = Index;
