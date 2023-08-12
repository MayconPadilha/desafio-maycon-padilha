class CaixaDaLanchonete {
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        const descontoDinheiro = 0.05; // 5%
        const acrescimoCredito = 0.03; // 3%

        let valorTotal = 0;

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        for (const item of itens) {
            const [codigo, quantidade] = item.split(",");

            if(parseInt(quantidade) === 0){
                return "Quantidade inválida!";
            }

            if(codigo === "chantily"){
                const itemEncontrado = buscarItemNoCarrinho("cafe", itens);
                if(itemEncontrado === null){
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

            if(codigo === "queijo"){
                const itemEncontrado = buscarItemNoCarrinho("sanduiche", itens);
                if(itemEncontrado === null){
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

            if (cardapio[codigo]) {
                valorTotal += cardapio[codigo] * parseInt(quantidade);
            } else {
                return "Item inválido!";
            }
        }

        function buscarItemNoCarrinho(codigoBuscado, itens) {
            for (const item of itens) {
                const [codigo] = item.split(',');
                if (codigo === codigoBuscado) {
                    return item;
                }
            }
            return null;
        }

        if (metodoDePagamento === "dinheiro") {
            valorTotal *= (1 - descontoDinheiro); 
            return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
        } else if (metodoDePagamento === "credito") {
            valorTotal *= (1 + acrescimoCredito);
            return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
        } else if (metodoDePagamento === "debito") {
            return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
        } else {
            return "Forma de pagamento inválida!";
        }

        // return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    }
}

export { CaixaDaLanchonete };
