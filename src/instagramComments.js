let comments_count;
let check;
let pages;

let participantes;
let cantidad_participantes;

// %2F (representa al slash)

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '54f2a06680mshee3722ecd5581eep164439jsn4976fab91e19',
		'X-RapidAPI-Host': 'instagram28.p.rapidapi.com'
	}
};

async function getComments() {
	const res = await fetch('https://instagram28.p.rapidapi.com/media_comments?short_code=CpyF5-bP25b&batch_size=50', options);
	const data = await res.json();

	if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
		console.log('data', data);

		comments_count = data.data.shortcode_media.edge_media_to_parent_comment.count;
		console.log('comments_count', comments_count);

		check = data.data.shortcode_media.edge_media_to_parent_comment.page_info.has_next_page;
		console.log('check', check);

		pages = Math.ceil(comments_count/50);
		console.log('pages', pages);

		let array_participantes = data.data.shortcode_media.edge_media_to_parent_comment.edges;

		let participantes = []; // limpio el array cada vez que ejecuto la función

		array_participantes.forEach(element => {
			let participante = {
				nombre_participante : element.node.owner.username,
				img_participante : element.node.owner.profile_pic_url,
				text_participante: element.node.text
			}

			// Preguntar si es válido incluir en el array a personas repetidas
			participantes.push(participante);
		});

		let next_page_cursor = data.data.shortcode_media.edge_media_to_parent_comment.page_info.end_cursor;

		if(pages > 1) {
			for (let i = 1; i < pages; i++) {
				if(check) {
					const res2= await fetch(`https://instagram28.p.rapidapi.com/media_comments?short_code=CpyF5-bP25b&next_cursor=${next_page_cursor}&batch_size=50`, options);
					const data2 = await res2.json();
		
					if(res2.status !== 200) {
						console.log("Hubo un error: " + res2.status);
					} else {
						console.log('data2', data2);

						let array_participantes2 = data2.data.shortcode_media.edge_media_to_parent_comment.edges;

						// Preguntar si es válido incluir en el array a personas repetidas
						array_participantes2.forEach(element => {
							let participante2 = {
								nombre_participante : element.node.owner.username,
								img_participante : element.node.owner.profile_pic_url,
								text_participante: element.node.text
							}
				
							participantes.push(participante2);
						});

						let check2 = data2.data.shortcode_media.edge_media_to_parent_comment.page_info.has_next_page;

						check = check2;

						let next_page_cursor2 = data2.data.shortcode_media.edge_media_to_parent_comment.page_info.end_cursor;

						next_page_cursor = next_page_cursor2;
					}
				}
			}
		}

		cantidad_participantes = participantes.length;
		console.log('participantes', participantes);
		console.log('cantidad de participantes', cantidad_participantes);
	}
}

/*participantes = [
	{
		nombre_participante: 'Manuel Araujo',
		user_id: 111111,
		user_profile_pic: 'https://urlmanuel'
	},
	{
		nombre_participante: 'María Prieto',
		user_id: 222222,
		user_profile_pic: 'https://urlmaria'
	},
	{
		nombre_participante: 'Jorge Vielma',
		user_id: 333333,
		user_profile_pic: 'https://urljorge'
	},
	{
		nombre_participante: 'Daniela Acosta',
		user_id: 444444,
		user_profile_pic: 'https://urldaniela'
	},
	{
		nombre_participante: 'Roberto Cano',
		user_id: 555555,
		user_profile_pic: 'https://urlroberto'
	},
	{
		nombre_participante: 'Verónica Nava',
		user_id: 666666,
		user_profile_pic: 'https://urlveronica'
	}
];*/

// getComments();