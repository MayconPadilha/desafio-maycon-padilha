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

        const ITENS_ASSOCIADOS = {
            chantily: "cafe",
            queijo: "sanduiche",
        };

        const DESCONTO_DINHEIRO = 0.05; // 5%
        const ACRESCIMO_CREDITO = 0.03; // 3%

        let valorTotal = 0;

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        for (const item of itens) {
            const [codigo, quantidade] = item.split(",");

            if(parseInt(quantidade) <= 0){
                return "Quantidade inválida!";
            }

            const itemPrincipal = ITENS_ASSOCIADOS[codigo];

            if (itemPrincipal) {
                const itemEncontrado = this.buscarItemNoCarrinho(itemPrincipal, itens);
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

        if (metodoDePagamento === "dinheiro") {
            valorTotal *= (1 - DESCONTO_DINHEIRO); 
            return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
        } else if (metodoDePagamento === "credito") {
            valorTotal *= (1 + ACRESCIMO_CREDITO);
            return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
        } else if (metodoDePagamento === "debito") {
            return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
        } else {
            return "Forma de pagamento inválida!";
        }

    }

    buscarItemNoCarrinho(codigoBuscado, itens) {
        for (const item of itens) {
            const [codigo] = item.split(',');
            if (codigo === codigoBuscado) {
                return item;
            }
        }
        return null;
    }
}

export { CaixaDaLanchonete };
