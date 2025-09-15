import dados from "../models/dados.js"
const { barbies } = dados;

const getAllBarbies = (req,res) =>{
    const resultado = barbies

    res.status(200).json({
        total: barbies.length,
        barbies: resultado
    })
}

const getBarbieById = (req, res) =>{
    let id = parseInt(req.params.id);

    const barbie = barbies.find(b => b.id === id);

    res.status(200).json({
        sucess: true,
        barbie: barbie
    })
}

const createBarbie = (req, res) =>{
    const {nome, profissao, anoLancamento } = req.body;

    if(!nome || !profissao){
        return res.status(400).json({
            sucess: false,
            message: "O nome da Barbie e sua Profissão são  O B R I G A T Ó R I O S"
        })
    }
    const novaBarbie = {
        id: barbies.length +1,
        nome: nome,
        profissao: profissao,
        anoLancamento: anoLancamento
    }
    barbies.push(novaBarbie)

    res.status(201).json({
        sucess: true,
        message: "Nova Barbie Criada",
        barbie: novaBarbie
    })
}

const deleteBarbie = (req, res) =>{
     let id = parseInt(req.params.id);

     const barbieParaDeletar = barbies.find(b => b.id === id);

     if(!barbieParaDeletar){
        return res.status(404).json({
            sucess: false,
            message: `Essa Barbie não existe ${id}`
        })
     };

     const barbiesFiltradas = barbies.filter(bruxo => bruxo.id !=id);

     barbies.splice(0, barbies.length, ...barbiesFiltradas);

     res.status(201).json({
        sucess: true,
        message: "Barbie Removida com sucesso",
        barbieParaDeletar: barbieParaDeletar
     })

}

const updateBarbie = (req, res) =>{
    const id = parseInt(req.params.id);
    const { nome, profissao, anoLancamento} = req.body;

    const idParaEditar = id;

    if(isNaN(idParaEditar)){
        return res.status(400).json({
            sucess: false,
            mensagem: "O id deve ser um número valido"
        })
    }

    const barbieExiste = barbies.find(barbie => barbie.id === idParaEditar);
    if(!barbieExiste) {
        return res.status(404).json({
            sucess: false,
            message: `Barbie com Id: ${id} não existe`
        })
    }

    const barbiesAtualizadas = barbies.map(barbie => barbie.id === idParaEditar ? {
        ...barbie,
        ...(nome && { nome }),
        ...(profissao && { profissao}),
        ...(anoLancamento && {anoLancamento: parseInt(anoLancamento)})
    } : barbie)

    
    barbies.splice(0, barbies.length, ...barbiesAtualizadas);
    const barbieNova = barbies.find(barbie => barbie.id === idParaEditar);

    res.status(200).json({
        sucess:true,
        message: `Dados da Barbie ID ${idParaEditar} atualizados com sucesso`,
        barbie: barbieNova
    })
}


export{ getAllBarbies, getBarbieById, createBarbie, deleteBarbie, updateBarbie }