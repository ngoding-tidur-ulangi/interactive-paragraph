const text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, totam! Dolor dicta eaque labore magni tenetur voluptas nisi modi, aliquam sapiente ducimus? Nemo, perspiciatis. Provident labore dicta illo cupiditate dolor?               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, totam! Dolor dicta eaque labore magni tenetur voluptas nisi modi, aliquam sapiente ducimus? Nemo, perspiciatis. Provident labore dicta illo cupiditate dolor?"
const textWidth = 400
const fontSize = 20
const spaceWidth = 8
const letterSpacing = 1


let lastX = 0
let lastY = 0

const fragment = document.createElement("div")

document.addEventListener('DOMContentLoaded', () => {
	const textContainer = document.getElementsByClassName('container')[0]

	fragment.style.display = "flex"
	fragment.style.width = `${textWidth}px`
	fragment.style.height = "min-content"
	fragment.style.flexWrap = "wrap";
	fragment.style.fontSize = `${fontSize}px`
	fragment.style.cursor = "default"

	for (const char of text) {
		const span = document.createElement('span')
		span.classList.add("letter")
		span.style.display = "block"
		span.style.height = `${fontSize}px`
		if(char == " "){
			span.style.width = `${spaceWidth}px`
		}
		span.textContent = char
		fragment.appendChild(span)
	}

	textContainer.appendChild(fragment)
	const letters = document.querySelectorAll(".letter")

	fragment.addEventListener("mousemove", (e) => {
		const { clientX, clientY } = e;

		let velo = 0
		// check velocity
		if(lastX == 0 && lastY == 0){
			velo = 0
		}else{
			velo = Math.sqrt(Math.pow(clientX-lastX, 2), Math.pow(clientY-lastY, 2))
		}
		lastX = clientX
		lastY = clientY

		
		if(velo>1){
			const iter = 12
			for(let i=0;i<iter;i++){
				setTimeout(
					() => {
						letters.forEach((letter, j) => {
							const { x, y } = letter.getBoundingClientRect()
							const distance = Math.sqrt(Math.pow(x-clientX, 2) + Math.pow(y-clientY, 2))
							if(distance < (i+1)*10 && distance > i*10 && !letter.classList.contains("on")){
								setTimeout(() => {
									letter.innerHTML = getRandomChar()
								}, 
									0
								)
								letter.classList.add("on")
								setTimeout(() => {
									letter.innerHTML = text[j]
								},
									60
								)
							}
						})
					},
					i*50
				)
			}
	
			for(let i=0;i<iter;i++){
				setTimeout(
					() => {
						letters.forEach((letter) => {
							const { x, y} = letter.getBoundingClientRect()
							const distance = Math.sqrt(Math.pow(x-clientX, 2) + Math.pow(y-clientY, 2))
							if(distance < (i+1)*10 && distance > i*10 && letter.classList.contains("on")){
								letter.classList.remove("on")
							}
						})
					},
					i*50 + iter*100
				)
			}
		}
	})

	textContainer.addEventListener("mousemove", (e) => {
		console.log(textContainer.offsetWidth, textContainer.offsetHeight)
		textContainer.style.background = `radial-gradient(circle at ${e.clientX*30/textContainer.offsetWidth + 25}%  ${e.clientY*30/textContainer.offsetHeight + 25}%, #020617 15%, #0f172a 35%, #334155)`;
	})

})

function getRandomChar() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	return chars[Math.floor(Math.random() * chars.length)];
}
