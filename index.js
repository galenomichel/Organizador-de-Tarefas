const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao app de metas!";

let metas

const carregarMetas = async () => {
   try {
      const dados = await fs.readFile("metas.json", "utf-8")
      metas = JSON.parse(dados)
   } catch (error) {
      metas = []
   }
}

const cadastrarMeta = async () => {
   const meta = await input({ message: "Digite a meta:"})

   if(meta.length == 0) {
      mensagem = 'A meta não pode estar vazia, escreva algo.'
      return
   }

   metas.push(
      {value: meta, checked: false}
   )

   mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
   const respostas = await checkbox({
      message: "Use as setas, o espaço para marcar/desmarcar e o Enter para finalizar",
      choices: [...metas],
      instructions: false,
   })

   metas.forEach((m) => {
      m.checked = false
   })

   if (respostas.length == 0) {
      mensagem = "Nenhuma meta selecionada!"
      return
   }

   respostas.forEach((resposta) => {
      const meta = metas.find((m) => {
         return m.value == resposta
      })

      meta.checked = true
   })

   mensagem = 'Meta(s) concluída(s)'
}

const metasRealizadas = async () => {
   const realizadas = metas.filter((meta) => {
      return meta.checked
   })

   if (realizadas.length == 0) {
      mensagem = 'Não existem metas realizadas! :('
      return
   }

   await select({
      message: "Metas realizadas: " + realizadas.length,
      choices: [...realizadas]
   })
}

const metasAbertas = async () => {
   const abertas = metas.filter((meta) => {
      return meta.checked != true
   })

   if (abertas.length == 0) {
      mensagem = 'Não existem metas abertas :)'
      return
   }

   await select({
      message: "Metas abertas: " + abertas.length,
      choices: [...abertas]
   })
}

const deletarMetas = async () => {
   const metasDesmarcadas = metas.map((meta) => {
      return {value : meta.value, checked: false}
   })

   const itemsDeletaveis = await checkbox ({
      message: "Selecione item para deletar",
      choices: [...metasDesmarcadas],
      instructions: false,
   })

   if (itemsDeletaveis.length == 0) {
      mensagem = "Nenhum item para deletar!"
      return
   }

   itemsDeletaveis.forEach((item) => {
      metas = metas.filter((meta) => {
         return meta.value != item
      })
   })

   mensagem = "Meta(s) deletada(s) com sucesso!"
}

const mostrarMensagem = () => {
   console.clear();

   if(mensagem != "") {
      console.log(mensagem)
      console.log("")//pula a linha no terminal
      mensagem = ""
   }
}

const start = async () => {
   carregarMetas()
   
   while(true){
      mostrarMensagem()

      const opcao = await select({
         message: "Menu >",
         choices: [
            {
               name: "Cadastrar meta",
               value: "cadastrar"
            },
            {
               name: "Listar metas",
               value: "listar"
            },
            {
               name: "Metas realizadas",
               value: "realizadas"
            },
            {
               name: "Metas abertas",
               value: "abertas"
            },
            {
               name: "Deletar metas",
               value: "deletar"
            },
            {
               name: "Sair",
               value: "sair"
            }
         ]
      })


      switch(opcao) {
         case "cadastrar":
            await cadastrarMeta()
            break
         case "listar":
            await listarMetas()
            break
         case "realizadas":
            await metasRealizadas()
            break
         case "abertas":
            await metasAbertas()
            break
         case "deletar":
            await deletarMetas()
            break
         case "sair":
            console.log("Até a próxima!")
            return
      }
   }
}

 start()