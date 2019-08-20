module Main exposing (..)

import Browser
import Html exposing (section)
import Html.Attributes exposing (class)

type Message = AddItem Item

type Item = Topping | Crust | Sauce

type alias Model = { items : List Item }

main : Program () Model Message
main = Browser.document
  {
    init = init,
    view = view,
    update = update,
    subscriptions = subscriptions
  }

-- INIT

init : () -> ( Model, Cmd msg )
init _ =
  ( { items = [] }, Cmd.none )


-- VIEW

view : Model ->  Browser.Document Message
view model =
  {
    title = "pizza pizza",
    body = [
      section [ class "pizza-maker" ] [
        section [ class "pizza-maker-controls" ] [],
        section [ class "pizza-maker-view" ] []
      ]
    ]
  }


-- UPDATE

update : Message -> Model -> ( Model, Cmd msg )
update msg model =
  ( { model | items = [] } , Cmd.none )

-- Subscribe

subscriptions : Model -> Sub msg
subscriptions model =
  Sub.none
