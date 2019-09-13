module Main exposing (..)

import Browser
import Html exposing (Html, article, aside, button, header, option, section, select, text)
import Html.Attributes exposing (class, disabled, selected, value)
import Html.Events exposing (onClick, onInput)


type Model
    = Pizza


type Message
    = Change


main : Program () Model Message
main =
    Browser.sandbox { init = init, view = view, update = update }



-- INIT


init : Model
init =
    Pizza



-- VIEW


view : Model -> Html Message
view model =
    section [ class "pizza-maker" ]
        [ header [ class "pizza-controls" ]
            [ aside [ class "topping-controls" ] []
            , aside [ class "order-controls" ] []
            ]
        , article [ class "pizza-display" ] []
        ]



-- UPDATE


update : Message -> Model -> Model
update msg model =
    model
