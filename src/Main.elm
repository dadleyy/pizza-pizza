module Main exposing (..)

import Browser
import Html exposing (article, aside, button, fieldset, legend, option, section, select, span, text)
import Html.Attributes exposing (class, disabled, selected, value)
import Html.Events exposing (onClick, onInput)

main : Program () () ()
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

-- INIT


init : () -> ( (), Cmd msg )
init _ =
    ( (), Cmd.none )



-- VIEW

view : () -> Browser.Document ()
view model =
    { title = "pizza pizza"
    , body = [section [] []]
    }

-- UPDATE

update : () -> () -> ( (), Cmd msg )
update msg model =
  ( model, Cmd.none )


-- Subscribe

subscriptions : () -> Sub msg
subscriptions model =
    Sub.none
