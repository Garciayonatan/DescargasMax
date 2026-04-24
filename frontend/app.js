function convertir(formato) {
    const url = document.getElementById("url").value;
  
    if (!url) {
      alert("Pega una URL");
      return;
    }
  
    fetch("/api/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url, formato })
    })
    .then(res => res.json())
    .then(data => {
      if (data.link) {
        window.open(data.link);
      } else {
        alert("Error en la descarga");
      }
    });
  }