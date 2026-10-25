// @ts-check
const { test, expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker');

const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')

let landingPage
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})


test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)


  await page.getByText('seus dados conosco').click()
  const content = await page.content()
  console.log(content)

  await page.waitForTimeout

});

test('Não deve cadastrar com e-mail incorreto', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('João da Silva', 'joaodasilva@.com.br')

  await landingPage.alertHaveText('Email incorreto')

});

test('Não deve cadastrar quando o nome não é prenchido', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'joaodasilva@gmail.com')

  await landingPage.alertHaveText('Campo obrigatório')

});

test('Não deve cadastrar quando o e-mail não é preenchido', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('João da Silva', '')

  await landingPage.alertHaveText('Campo obrigatório')

});

test('Não deve cadastrar quando o nenhum campo é preenchido', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});