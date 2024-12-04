package example

object Hello extends Greeting with App {
  println(greeting)

  def main(): Unit = println("hejsan")
}

trait Greeting {
  lazy val greeting: String = "hello"
}
