import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['debito', 'R$ 4,50', ['cafe,1','chantily,1']],
    ])('compra de cafe com chantily em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 15,96', ['combo1,1','cafe,2']],
    ])('compra de combo e dois cafe em %p deve resultar em %p', validaTeste);

    test.each([
        ['debito', 'R$ 15,00', ['sanduiche,2','queijo,1']],
    ])('compra de sanduiche com queijo em %p deve resultar em %p', validaTeste);

    test.each([
        ['compra de combo sem itens', 'credito', 'Quantidade inválida!', ['combo1,0']],
        ['compra de combo sem itens', 'credito', 'Quantidade inválida!', ['combo1,-1']],
        ['compra de item inexistente', 'debito', 'Item inválido!', ['bolinho,1']],
        ['compra de suco e sanduiche', 'dinheiro', 'R$ 12,06', ['suco,1', 'sanduiche,1']],
        ['compra de salgado com queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['salgado,1', 'queijo,1']],
        ['compra de chantily com suco', 'debito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'suco,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['credito', 'R$ 99,09', ['combo2,3','cafe,4','chantily,4','sanduiche,1','queijo,6','suco,6']],
    ])('compra de varios itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'Item inválido!', ['batatafrita,4']],
        ['debito', 'Item inválido!', ['batatafrita,4']],
        ['dinheiro', 'Item inválido!', ['batatafrita,4']],
    ])('Validando mensagem de erro: compra de item invalido em %p', validaTeste);

    test.each([
        ['credito', 'Quantidade inválida!', ['cafe,0']],
        ['debito', 'Quantidade inválida!', ['cafe,0']],
        ['dinheiro', 'Quantidade inválida!', ['cafe,0']],
    ])('Validando mensagem de erro: compra de item com quantidade invalido em %p', validaTeste);

    test.each([
        ['pix', 'Forma de pagamento inválida!', ['cafe,2']],
    ])('Validando mensagem de erro: compra de item com forma de pagamento invalido em %p', validaTeste);

    test.each([
        ['debito', 'Item extra não pode ser pedido sem o principal', ['combo1,1','chantily,1']],
    ])('Validando mensagem de erro: compra de combo não são considerados como item principal.', validaTeste);
    
    test.each([
        ['debito', 'R$ 10,50', ['cafe,1','chantily,5']],
    ])('compra de item extra sem precisar de mais de um item principal.', validaTeste);

});
