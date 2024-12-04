package example

import org.scalatest.funsuite.AnyFunSuite
import scala.math.pow

  class CubeCalculatorTest extends AnyFunSuite {
      test("CubeCalculator.cube") {
          assert(pow(3, 3)  === 27)
      }
  }