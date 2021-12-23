$(document).ready(function () {

  let urlParam = new URLSearchParams(window.location.search)
  let postId = urlParam.get("id");


  // ajouter un article
  $("form").submit(function (event) {
    var formData = {
      title: $("#title").val(),
      content: $("#content").val(),
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/posts",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function () {
      window.location.href = "index.html";
    });

    event.preventDefault();
  });


if (postId) {
  // afficher un article
    $.ajax({
        "url": "http://localhost:3000/posts/" + postId,
        "method": "GET",
        "timeout": 0,
    }).done(function (response) {
        $('.postsList').append(`

        <div class="container">
          <div class="contenu-article">
            <h2>${response.title}</h2>
            <p>${response.content}</p>
          </div>
          <form>
            <p>Modifier l'article :</p>
            <label for="title">titre article</label>
            <input type="text" id="title" class="champ" placeholder="${response.title}" />
            <label for="content">description</label>
            <textarea type="text" id="content" class="champ" placeholder="${response.content}"></textarea>
            <input type="submit" class="submit-button" value="Modifier" />
          </form>

          <div class="liens-article">
            <a href="index.html">Retour</a>
            <button class="deletePost">Supprimer</button>
          </div>
        </div>
        `);
   

        // supprimer l'article
    $(".deletePost").click(function () {
      let confirmDelete = confirm("supprimer cet article ?");

      if (confirmDelete == true) {
      $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/posts/" + postId,
        data: {_method: 'delete'},
        success: function () {
          window.location.href = "index.html";
        },
        error: function (data) {
            console.log('Error:', data);
        }
    })
  }
  });

  // modifier un article
  $("form").submit(function (event) {
    let formData = {
      title: $("#title").val(),
      content: $("#content").val(),
    };

    $.ajax({
      type: "PUT",
      url: "http://localhost:3000/posts/" + postId,
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function () {
      window.location.href = "index.html";
    });

    event.preventDefault();
  });


});
}
else {
  // afficher la liste des articles
    $.ajax({
        "url": "http://localhost:3000/posts",
        "method": "GET",
        "timeout": 0,
    }).done(function (response) {
        for (let i = 0; i < response.length; i++) {
            $('.postsList').append(`
            <div class="post-card">
                <h2 class="">${response[i].title}</h2>
                <p class="">${response[i].content}</p>
                <a class="voir-plus" href="?id=${response[i]._id}" class="">Voir plus</a>
            </div>
        `)
        }
    });
}  




})