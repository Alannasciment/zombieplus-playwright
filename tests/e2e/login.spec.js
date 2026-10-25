const { test, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPage')
const {MoviesPage} = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components')

let loginPage
let moviesPage
let toast

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    moviesPage = new MoviesPage(page)
    toast = new Toast(page)
})

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
})

test('não deve logar com a senha incorreta', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'abc123')

    await expect(
        page.getByText(
            'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
        )
    ).toBeVisible()
})

test('não deve logar quando o e-mail é invalido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('www.teste.com.br', 'pwd123')

    await expect(
        page.getByText(
            'Email incorreto'
        )
    ).toBeVisible()
})

test('não deve logar quando o e-mail não é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', 'abc123')

    await expect(
        page.getByText(
            'Campo obrigatório'
        )
    ).toBeVisible()
})

test('não deve logar quando a senha não é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('zombieplus', '')

    await expect(
        page.getByText(
            'Campo obrigatório'
        )
    ).toBeVisible()
}) 

test('não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', '')

    await expect(
        page.getByText(
            'Campo obrigatório'
)
    ).toHaveCount(2)
}) 



