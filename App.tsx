import { use, useState } from 'react';
import { StyleSheet, ScrollView, Modal, Text, View, StatusBar, FlatList, Button, Pressable, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';


let tick: {
  status: string;
  id: number;
  title: string;
  description: string;
  rating: number | null;
};

export default function App() {
  const [pressed, setPressed] = useState(false)
  const [selectedValue, setSelectedValue] = useState("Created");
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [edit, setEdit] = useState(false)
  const [tickets, setTickets] = useState(
    [
      { status: "Created", id: 1, title: "Task One", description: "Complete the initial setup.", rating: 1 },
      { status: "Under Assistance", id: 2, title: "Task Two", description: "Review the documentation.", rating: null },
      { status: "Created", id: 3, title: "Task Three", description: "Awaiting client feedback.", rating: 2 },
      { status: "Completed", id: 4, title: "Task Four", description: "Finalize the design mockups.", rating: null },
      { status: "Under Assistance", id: 5, title: "Task Five", description: "Implement user authentication.", rating: 3 },
      { status: "Created", id: 6, title: "Task Six", description: "Set up database schema.", rating: null },
      { status: "Created", id: 7, title: "Task Seven", description: "Schedule team meeting.", rating: 4 },
      { status: "Completed", id: 8, title: "Task Eight", description: "Deploy to staging environment.", rating: null },
      { status: "Under Assistance", id: 9, title: "Task Nine", description: "Write unit tests.", rating: 5 },
      { status: "Created", id: 10, title: "Task Ten", description: "Update project roadmap.", rating: null },
      { status: "Created", id: 11, title: "Task Eleven", description: "Gather user requirements.", rating: 0 },
      { status: "Completed", id: 12, title: "Task Twelve", description: "Fix reported bugs.", rating: null },
      { status: "Created", id: 13, title: "Task Thirteen", description: "Optimize performance.", rating: 1 },
      { status: "Under Assistance", id: 14, title: "Task Fourteen", description: "Refactor legacy code.", rating: null },
      { status: "Completed", id: 15, title: "Task Fifteen", description: "Prepare release notes.", rating: 4 }
    ]
  )



  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar backgroundColor="lightblue" barStyle="light-content" hidden></StatusBar>

      <Text style={styles.title}>Your Tickets</Text>

      <Pressable onPress={() => { setPressed(true) }} style={styles.addBtn}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>+</Text>
      </Pressable>
      <ScrollView style={styles.container}>


        <FlatList style={{ width: '100%', paddingBottom: 50, }}
          scrollEnabled={false}
          data={tickets}
          renderItem={({ item }) => <TicketItem ticket={item} onEdit={() => { setEdit(true); setSelectedValue(item.status); setDesc(item.description); setTitle(item.title) }} onDelete={() => setTickets(tickets.filter((tick) => tick.id !== item.id))}>

          </TicketItem>}
          keyExtractor={item => item.id.toString()}
        >
          
        </FlatList>

{/* Edit modal */}
          <Modal visible={edit} onRequestClose={() => setEdit(false)} animationType="slide" presentationStyle="formSheet">
            <View style={{ backgroundColor: "#f5f5f5", padding: 20 }}>
              <Text style={[styles.title, { backgroundColor: 'lightgray' }]}>Edit Ticket</Text>
              <View style={{ marginVertical: 10 }}>
                <Text>Ticket title</Text>
                <TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder='Enter ticket title...'></TextInput>
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text>Ticket description</Text>
                <TextInput value={desc} onChangeText={setDesc} style={styles.input} placeholder='Enter ticket description...' multiline></TextInput>
              </View>

              <View style={{ marginVertical: 10 }} >
                <Text>Select Status</Text>
                <Picker
                  itemStyle={styles.input}
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 250 }}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Created" value="Created" />
                  <Picker.Item label="Under Assitance" value="Under Assitance" />
                  <Picker.Item label="Completed" value="Completed" />
                </Picker>
              </View>
              <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end' }}>
                <Button title="Save" onPress={() => {
                  setEdit(false);
                  let idx = tickets.findIndex((t) => t.id === tick.id)
                  tickets[idx].description = desc
                  tickets[idx].title = title
                  tickets[idx].status = selectedValue

                  setTickets(tickets);
                  setSelectedValue("Created");
                  setDesc("");
                  setTitle("")
                }} color="#35bdc2ff"></Button>
                <Button title="Close" onPress={() => {
                  setEdit(false)
                  setSelectedValue("Created");
                  setDesc("");
                  setTitle("")
                  }} color="#e73939ff"></Button>
              </View>
            </View>
          </Modal>

        <Modal visible={pressed} onRequestClose={() => setPressed(false)} animationType="slide" presentationStyle="formSheet">
          <View style={{ backgroundColor: "#f5f5f5", padding: 20 }}>
            <Text style={styles.title}>New Ticket</Text>
            <View style={{ marginVertical: 10 }}>
              <Text>Ticket title</Text>
              <TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder='Enter ticket title...'></TextInput>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text>Ticket description</Text>
              <TextInput value={desc} onChangeText={setDesc} style={styles.input} placeholder='Enter ticket description...' multiline></TextInput>
            </View>

            <View style={{ marginVertical: 10 }} >
              <Text>Select Status</Text>
              <Picker
                itemStyle={styles.input}
                selectedValue={selectedValue}
                style={{ height: 50, width: 250 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Created" value="Created" />
                <Picker.Item label="Under Assitance" value="Under Assitance" />
                <Picker.Item label="Completed" value="Completed" />
              </Picker>
            </View>
            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end' }}>
              <Button title="Save" onPress={() => {
                setPressed(false);
                setTickets([
                  { title: title, description: desc, status: selectedValue, id: Math.floor(Math.random() * 1000 + 100), rating: null }, ...tickets
                ]);
                setSelectedValue("Created");
                setDesc("");
                setTitle("")
              }} color="#35bdc2ff"></Button>
              <Button title="Close" onPress={() => {
                setPressed(false)
                setSelectedValue("Created");
                setDesc("");
                setTitle("")
                }} color="#e73939ff"></Button>
            </View>
          </View>
        </Modal>


      </ScrollView>
    </SafeAreaView>
  );
}

const TicketItem = ({ ticket, onDelete, onEdit }: { ticket: { status: string, id: number, title: string, rating: null | number, description: string }, onDelete: () => void, onEdit: () => void }) => {

  return (
    <View style={styles.tket}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.statusText, { fontWeight: 'bold' }]}>{ticket.title}: </Text>
        <Text style={{ color: 'gray', fontSize: 16 }}>{ticket.description}</Text>
      </View>
      <View style={{ marginVertical: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        <Text style={[ticket.status === 'Completed' ? styles.completed : ticket.status === 'Created' ? styles.created : styles.assist, styles.status]}>{ticket.status}</Text>
      </View>


      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 20 }}>
        <Pressable onPress={() => Alert.alert('Ticket Deletion', 'Are you sure you want to delete this ticket ?', [{
          text: 'Yes',
          onPress: () => onDelete(),
          style: 'default',
        },
        {
          text: 'No',
          style: 'destructive'
        }
        ])} style={[styles.iconContainer, { backgroundColor: '#e73939ff' }]}>
          <FontAwesome name="trash" size={24} color="white" />
        </Pressable>

        <Pressable style={[styles.iconContainer, { backgroundColor: 'lightgrey' }]}
          onPress={() => { onEdit(); tick = ticket }}
        >
          <AntDesign name="edit" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: '100%',
    padding: 20,

  },
  iconContainer: {
    padding: 10,
    borderRadius: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    alignSelf: "center",
    backgroundColor: '#35bdc2ff',
    width: '100%',
    textAlign: 'center',
    padding: 50,
    marginBottom: 4,
    boxShadow: '1px 2px 4px gray',
    borderRadius: 16
  },
  addBtn: {
    backgroundColor: '#35bdc2ff',
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    width: 60,
    height: 60,
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    zIndex: 999

  },
  created: {
    backgroundColor: '#35bdc2ff',
  },
  assist: {
    backgroundColor: '#fdd000',
  },
  completed: {
    backgroundColor: '#10c27eff',
  },
  status: {
    padding: 8,
    borderRadius: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  tket: {
    borderColor: 'gray',
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: "#f5f5f5",
    elevation: 4,
    marginVertical: 10,
    padding: 10,
    marginHorizontal: 5
  },
  statusText: {
    color: 'black',
    fontSize: 16

  },
  input: {
    borderColor: '#474747ff',
    borderWidth: 0.5,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 4
  }

});