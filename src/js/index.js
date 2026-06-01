document.addEventListener("DOMContentLoaded", function () {
	// Objetivo:
	// Enviar um texto de um formulário para uma API do n8n e exibir o resultado o código html, css e colocar a animação no fundo da tela do site.
	// Passos:
	// 1. No JavaScript, pegar o evento de submit do formulário para evitar o recarregamento da página.
	// 2. Obter o valor digitado pelo usuário no campo de texto.
	// 3. Exibir um indicador de carregamento enquanto a requisição está sendo processada.
	// 4. Fazer uma requisição HTTP (POST) para a API do n8n, enviando o texto do formulário no corpo da requisição em formato JSON.
	// 5. Receber a resposta da API do n8n (esperando um JSON com o código HTML/CSS do background).
	// 6. Se a resposta for válida, exibir o código HTML/CSS retornado na tela:
	//    - Mostrar o HTML e CSS gerado em uma área de preview.
	//    - Inserir o CSS retornado dinamicamente na página para aplicar o background.
	// 7. Remover o indicador de carregamento após o recebimento da resposta.

	// Passos:
	// 1. No JavaScript, pegar o evento de submit do formulário para evitar o recarregamento da página.
	const form = document.querySelector(".form-group");
	// 2. Obter o valor digitado pelo usuário no campo de texto.
	const description = document.getElementById("description");
	const htmlCode = document.getElementById("html-code");
	const cssCode = document.getElementById("css-code");
	const preview = document.getElementById("preview-section");

	function setLoading(isLoading) {
		const button = document.getElementById("generate-btn");
		if (isLoading) {
			button.innerHTML = "Gerando Background...";
		} else {
			button.innerHTML = "Gerando Background Mágico";
		}
	}

	function applyGeneratePreview(html, css) {
		// 6. Se a resposta for válida, exibir o código HTML/CSS retornado na tela:
		//    - Mostrar o HTML e CSS gerado em uma área de preview.
		//    - Inserir o CSS retornado dinamicamente na página para aplicar o background.
		htmlCode.textContent = html;
		cssCode.textContent = css;

		preview.style.display = "block";
		preview.innerHTML = html;

		const existingStyle = document.getElementById("dynamic-style");
		if (existingStyle) {
			existingStyle.remove();
		}

		if (css) {
			const style = document.createElement("style");
			style.id = "dynamic-style";
			style.textContent = css;
			document.head.appendChild(style);
		}
	}

	form.addEventListener("submit", async function (event) {
		event.preventDefault();

		const descriptionValue = description.value.trim();

		if (!descriptionValue) {
			return;
		}

		// 3. Exibir um indicador de carregamento enquanto a requisição está sendo processada.
		setLoading(true);

		// 4. Fazer uma requisição HTTP (POST) para a API do n8n, enviando o texto do formulário no corpo da requisição em formato JSON.
		try {
			const response = await fetch("teu link do n8n", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ descriptionValue }),
			});

			const data = await response.json();

			// 5. Receber a resposta da API do n8n (esperando um JSON com o código HTML/CSS do background).

			const html = data.html || "Nenhum código HTML retornado.";
			const css = data.css || "Nenhum código CSS retornado.";

			applyGeneratePreview(html, css);
		} catch (error) {
			console.error("Erro ao gerar o background:", error);
			htmlCode.textContent = "Erro ao gerar o HTML.";
			cssCode.textContent = "Erro ao gerar o CSS.";
			preview.innerHTML = "";
		} finally {
			// 7. Remover o indicador de carregamento após o recebimento da resposta.
			setLoading(false);
		}
	});
});
