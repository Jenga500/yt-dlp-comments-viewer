function loadfile(event) {
    var fr = new FileReader();
    fr.onload = function () {
        obj = JSON.parse(fr.result);
        console.log(obj['title'])
        document.getElementById("thumbnail").src = obj['thumbnail'];
        document.getElementById("title").innerHTML = obj['title'];
        document.getElementById("description").innerHTML = obj['description'].replaceAll("\n", "<br>");
        document.getElementById("comments").innerHTML = "";
        document.getElementById("creator").innerHTML = obj['channel']
        document.getElementById("video_link").setAttribute("href", obj["webpage_url"]);

        obj['comments'].forEach(key => {
            comms = document.getElementById("comments");


            let li_item = document.createElement("li");
            li_item.setAttribute("id", key['author_id'])

            let username = document.createElement("h3");
            username.setAttribute("class", "username");
            username.innerHTML = key['author'];

            let content = document.createElement("p");
            content.setAttribute("class", "content");
            content.innerHTML = key['text'].replaceAll("\n", "<br>");

            let avatar = document.createElement("img");
            avatar.setAttribute("src", key['author_thumbnail'])

            let table = document.createElement("table");
            let tr = (document.createElement('tr'))

            let td1 = document.createElement("td");
            let td2 = document.createElement("td");

            td1.appendChild(avatar);
            td2.appendChild(username);

            tr.appendChild(td1);
            tr.appendChild(td2);

            table.appendChild(tr);

            li_item.appendChild(table);
            li_item.appendChild(content);
            if (key["parent"] == "root") {
                comms.appendChild(li_item);
            }
            else {
                let ul = document.createElement("ul");
                ul.appendChild(li_item);
                comms.appendChild(ul);
            }
        });

    }
    console.log(fr.readAsText(event.target.files[0]));
}