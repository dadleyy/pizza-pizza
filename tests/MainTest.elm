module MainTest exposing (..)

import Expect
import Main
import Test


testRemovalNothin : () -> Expect.Expectation
testRemovalNothin _ =
    Expect.equal (Main.getCurrentvalue (Main.Removal Main.Sauce)) Nothing


suite : Test.Test
suite =
    Test.describe "getCurrentvalue"
        [ Test.test "it returns nothing if the change is a removal" testRemovalNothin
        ]
