package aoc2024.day4

import scala.io.Source
import scala.util.Using

object AdventOfCode4 {
  val MultiplyRegexp = """mul\((\d+),(\d+)\)""".r
  val ToggleMultiplyRegexp = """(mul\((\d+),(\d+)\))|(do\(\))|(don\'t\(\))""".r

  @main def part1(fileName: String): Unit = {
    var total = 0

    for (line <- Source.fromResource(fileName).getLines()) {
      for (operation <- MultiplyRegexp.findAllIn(line).matchData) {
        operation.subgroups match {
          case List(left, right) => total += left.toInt * right.toInt
          case _                 =>
        }
      }
    }

    println(s"part1: ${total}")
  }

  @main def part2(fileName: String): Unit = {
    var total = 0
    var enabled = true

    for (line <- Source.fromResource(fileName).getLines()) {
      for (operation <- ToggleMultiplyRegexp.findAllIn(line).matchData) {

        operation.subgroups match {
          case List(null, null, null, _, null) => enabled = true
          case List(null, null, null, null, _) => enabled = false
          case List(_, left, right, _, _) if enabled =>
            total += left.toInt * right.toInt
          case _ =>
        }
      }
    }

    println(s"part2: ${total}")
  }

}
