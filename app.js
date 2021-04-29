let afterParam = '';
fetchMemes();

function fetchMemes() {
  colorChange();

  if(document.getElementById('memes')){
    document.getElementById('memes').remove();
  }

  let parentDiv = document.createElement('div');
  parentDiv.id = 'memes';

  fetch(`https://www.reddit.com/r/memes.json?after=${afterParam}`)
    .then(response => response.json())
    .then(({ data: {after, children } }) => {
      //console.log(children);
      afterParam = after;
      children.forEach(({ data: { post_hint = '', url_overridden_by_dest, title } }) => {
        if (post_hint === 'image') {
          console.log(url_overridden_by_dest);
          let div = document.createElement('div');
          let h2 = document.createElement('h4');
          let img = document.createElement('img');
          img.src = url_overridden_by_dest;
          h2.textContent = title;
          div.appendChild(h2);
          div.appendChild(img);
          parentDiv.appendChild(div);
        }
      });
    })
    .catch(error => console.log(error));

  document.body.appendChild(parentDiv);

}