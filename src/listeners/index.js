module.exports = (io, worker, client) => {

    /** Handle Redis */

    worker.subscribe(["messages", "notifications"]); // This events come from Laravel

    worker.on("message", (channel, event) => { // This is generic event, don't change it
        const response = JSON.parse(event);

        switch (channel) {
            case "messages":
                io.in(response.data.to.id).emit("messages", response.data);
                break;
            case "notifications":
                io.in(response.data.to.id).emit("notifications", response.data);
                break;
            default:
                break;
        }
    });

    /** Direct sockets events */
    
    io.on("connection", socket => 
    {
        // Important:
        // From client, emit "auth" with the ID of the user when he authenticate
        
        socket.on("auth", id => { 
            
            // Then, join the user to a room that has as name it's own ID. 
            // With this, every message or notification to that user can be 
            // sended using is ID as room, as shown above this
            
            socket.join(user_id); 
        });
    });
};
