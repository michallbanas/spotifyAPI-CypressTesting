/// <reference types="cypress" />

const songName = 'American Idiot' // this is the song we are going to search for

describe('Search track and add track to the playlist', () => {

    it('should search a track', () => {

        cy.request({
            method: 'GET',
            url: '/search?q=american%20idiot&type=track', // enviroment variable used to get the url
            headers: {
                'Authorization': Cypress.env('getToken'),
                'Content-Type': 'application/json',
            }
        })
    
        .should((response) => {
            expect(response.status).to.eq(200) // check if the status code is 200
            expect(response.body.tracks.items[0].type).to.eq('track') // checking if the type is track
            expect(response.body.tracks.items[0].name).to.eq(songName) // checking if the name is the song we are looking for

            cy.log(response.body) // log the response body
            cy.log(response.body.tracks.items[0].uri) // log the uri of the track
        })

    }) 

 it ('should add a track to playlist', () => {
    cy.request({
        method: 'POST',
        url: '/playlists/4ZHYupkNnpyt4l1RhtmSmd/tracks?position=1&uris=spotify%3Atrack%3A6nTiIhLmQ3FWhvrGafw2zj%2C',
        headers: {
            'Authorization': Cypress.env('postToken'),
            'Content-Type': 'application/json'
        }
    })
    .should((response) => {
        expect(response.status).to.eq(201) // status code 201
        cy.log(response.body)
    })
}) 

})