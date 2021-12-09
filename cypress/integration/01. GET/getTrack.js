/// <reference types="cypress" />

// Bearer token: https://developer.spotify.com/console/

const user = 'michallbanas'

// Test Collection

describe('Basic Spotify tests', () => {
    
    // First test

    it('should find a playlist name & ID', () => {
        cy.request({
            method: 'GET', // http method
            url: '/me/playlists', // endpoint
            headers: {
                'Authorization': Cypress.env('getToken'),
                'Content-Type': 'application/json'
            }
        })
            .should((response) => {
                expect(response.status).to.eq(200) // status code 200
                expect(response.body.items[0].owner.id).to.eq(user) // playlist owner
                expect(response.body.items[0].public).to.eq(true) // playlist public = true
                expect(response.body.items.length).not.to.eq(0) // playlist length > 0
        
                cy.log(response.body) // full response of body
                cy.log(response.body.items[0].name); // playlist name
                cy.log(response.body.items[0].id); // playlist id
            })
        })

        // Second test
        
     it ('should find tracks of playlist', () => {
        cy.request({
                method: 'GET',
                url: '/playlists/4ZHYupkNnpyt4l1RhtmSmd/tracks',
                headers: {
                    'Authorization': Cypress.env('getToken'),
                    'Content-Type': 'application/json'
                }
            })
            .should((response) => {
                expect(response.status).to.eq(200) // status code 200  
                expect(response.body.items[0].track.album.album_type).contains('album') // album type = album

                cy.log(response.body)
                cy.log(response.body.items[0].track.name); // track name
            })
        })

        // Third test
    
        it ('should find a track(and Url of the track', () => {
            cy.request({
                method: 'GET',
                url: '/search?q=american%20idiot&type=track',
                headers: {
                    'Authorization': Cypress.env('getToken'),
                    'Content-Type': 'application/json'
                }
            })
            .should((response) => {
                expect(response.status).to.eq(200) // status code 200 
                cy.log(response.body)
                cy.log(response.body.tracks.items[0].uri)
            })
        })  
})