/// <reference types="cypress" />

describe('Delete track', () => {

    it('should delete track from a playlist', () => {
        cy.request({
            method: 'DELETE',
            url: '/playlists/4ZHYupkNnpyt4l1RhtmSmd/tracks',
            headers: {
                'Authorization': Cypress.env('deleteToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"tracks":[{"uri":"spotify:track:6nTiIhLmQ3FWhvrGafw2zj"}]})
        })
        .should((response) => {
            expect(response.status).to.eq(200)
        })
    })
})