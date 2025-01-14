Stanza(function(stanza, params) {

  let formBody = [];

  for (let key in params) {
    if(params[key]) formBody.push(key + "=" + encodeURIComponent(params[key]));
  }

  let options = {
    method: "POST",
    mode:  "cors",
    body: formBody.join("&"),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  console.log(options);

  let apiUrl = "https://nanbyodata.jp/sparqlist/api/";
  let apiName = "get_medgen_entry_by_nando_id";
  let q = fetch(apiUrl + apiName, options).then(res => res.json());

  q.then(function(json) {

    console.log(json);
    let data = json[0];
    data.labels_ary = json[0].labels.join("; ");

    stanza.render({
      template: "stanza.html",
      parameters: {
        result: json[0]
      }
    });
  });
});
