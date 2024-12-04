import Dependencies._

ThisBuild / scalaVersion     := "3.5.2"
ThisBuild / organization     := "com.cawibo"
ThisBuild / organizationName := "cawibo"

libraryDependencies ++= Seq(
  "org.scalatest" %% "scalatest" % "3.2.19" % Test
)
